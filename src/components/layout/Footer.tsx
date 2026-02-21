import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto">
      {/* Mission Section */}
      <div className="bg-muted/30 border-t border-border/50 py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-teal-500 mb-4 leading-snug">
            Helping people reconnect with their belongings
          </h2>
          <p className="text-muted-foreground text-base flex items-center gap-2">
            Crafted with care <span className="text-pink-500 text-xl">❤️</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-background border-t border-border/50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            {/* Left Column */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">FindIt</h3>
              <p className="text-teal-500 text-sm mb-4">
                A Lost & Found application by KhoyaPaaya
              </p>
              <p className="text-muted-foreground text-sm mb-1">
                Need help or have feedback?
              </p>
              <a
                href="mailto:help@khoyapaaya.in"
                className="text-teal-500 text-sm font-medium hover:underline"
              >
                help@khoyapaaya.in
              </a>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-start sm:items-end gap-4">
              <Link
                to="/support"
                className="text-teal-500 font-semibold text-base hover:underline"
              >
                Support This Project
              </Link>
              <Link
                to="/support"
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-pink-500 text-2xl">❤️</span>
                <span className="text-xs font-medium">Donate</span>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              © 2026 KhoyaPaaya. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
