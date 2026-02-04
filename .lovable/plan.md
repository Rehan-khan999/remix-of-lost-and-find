

# Fix: Genie Chat Panel Scroll Blocked by Three.js Canvas

## Root Cause

The scroll doesn't work in the original position because **the Three.js canvas is sitting on top of the chat panel and capturing scroll events**.

Here's what's happening:
- The Three.js canvas: 420x420px, positioned bottom-right, `z-index: 60`
- The chat panel: 340x420px, positioned to the left of the genie, `z-index: 50`
- **The canvas has `pointer-events: auto` on the renderer element** to allow clicking the lamp
- Since the canvas has a higher z-index and covers the same area, **it intercepts wheel/scroll events** meant for the chat panel

When you drag the panel away, it moves outside the canvas area, so scrolling works.

## Solution

We need to restructure the z-index and pointer-events so that:
1. The chat panel can receive scroll events
2. The lamp remains clickable
3. The genie head can still visually appear above the chat (for the "peeking" effect)

### Approach: Raise the chat panel's z-index above the canvas

**Change the z-index hierarchy:**
- Chat panel: `z-index: 70` (was 50)
- ThreeCanvas container: `z-index: 60` (unchanged)

This puts the chat panel on top, so it receives scroll events properly. The genie's "peeking above chat" visual effect will be achieved differently if needed (CSS or visual layering within the scene).

---

## Technical Implementation

### File: `src/components/GenieChatPanel.tsx`

**Change z-index from 50 to 70:**

```typescript
style={{
  left: `${position.x}px`,
  top: `${position.y}px`,
  width: `${panelWidth}px`,
  maxHeight: `${panelHeight}px`,
  zIndex: 70, // CHANGED: Higher than ThreeCanvas (60) so scroll events work
  transform: 'none',
}}
```

### File: `src/components/ThreeCanvas.tsx`

**Add a wheel event passthrough** to ensure the canvas doesn't block scrolling:

```typescript
// In the container div
onWheel={(e) => e.stopPropagation()} // Prevent wheel capture when needed
```

Or better, add CSS to specifically disable wheel event capture:

```typescript
renderer.domElement.style.pointerEvents = 'auto';
renderer.domElement.style.touchAction = 'none'; // Prevents touch scroll interference
```

And update the container:

```typescript
style={{ 
  bottom: '10px',
  right: '10px',
  width: '420px',
  height: '420px',
  pointerEvents: 'none',
  zIndex: 60,
  // The canvas inside has pointer-events: auto for lamp clicks only
}}
```

---

## Summary

| Component | Before | After |
|-----------|--------|-------|
| Chat Panel z-index | 50 | 70 |
| ThreeCanvas z-index | 60 | 60 |
| Result | Canvas blocks scroll | Chat receives scroll events |

This one-line z-index change should fully resolve the scrolling issue without affecting the lamp click interaction or the visual presentation of the genie.

