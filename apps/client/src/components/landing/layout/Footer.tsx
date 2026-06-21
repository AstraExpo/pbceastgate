import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { NavItem, SubLink, UserProfile } from "./mock.data";

interface HeaderProps {
  navTree: NavItem[];
  isAuthenticated: boolean;
  userProfile?: UserProfile;
}

export function Footer({ navTree, isAuthenticated, userProfile }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: Logo Element */}
          <div className="flex shrink-0">
            <Link
              to="/"
              className="text-base sm:text-lg font-bold tracking-tight text-foreground"
            >
              PBC EASTGATE
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Blocks */}
          <nav className="hidden md:flex items-center gap-x-6">
            {navTree.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    className="flex items-center gap-x-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer py-2"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href || "/"}
                    className="text-sm text-muted-foreground hover:text-foreground py-2"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Desktop Multilevel Dropdown Panel */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-48 rounded-md border border-border bg-popover p-2 shadow-md">
                    {item.children.map((child: SubLink) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block rounded-sm px-3 py-1.5 text-xs sm:text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT: Dynamic CTA / User Auth Account Cluster */}
          <div className="hidden md:flex items-center gap-x-4">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-x-2 text-sm text-foreground"
              >
                <div className="h-8 w-8 rounded-full bg-accent border border-border overflow-hidden">
                  {userProfile?.avatarUrl && (
                    <img
                      src={userProfile.avatarUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <span className="text-xs sm:text-sm">{userProfile?.name}</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  to="/"
                  className="rounded-md bg-primary px-3.5 py-1.5 text-xs sm:text-sm text-primary-foreground font-medium hover:bg-primary/90"
                >
                  Join Congregation
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Icon Frame */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                {isMobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL COMPONENT SCALING */}
      {isMobileOpen && (
        <div className="border-b border-border bg-background px-4 py-4 md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav className="flex flex-col gap-y-4">
            {navTree.map(item => (
              <div key={item.label} className="space-y-1">
                <span className="text-sm font-semibold text-foreground block">
                  {item.label}
                </span>
                {item.children ? (
                  <div className="pl-4 border-l border-border flex flex-col gap-y-2 mt-1">
                    {item.children.map((child: SubLink) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="text-xs sm:text-sm text-muted-foreground block"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.href || "/"}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-xs sm:text-sm text-muted-foreground block pl-4"
                  >
                    View Page
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth Target Container */}
            <div className="pt-4 border-t border-border flex flex-col gap-y-2">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm text-foreground flex items-center gap-x-2"
                >
                  <span>Dashboard Profile ({userProfile?.name})</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-sm text-center py-2 text-muted-foreground"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-md bg-primary py-2 text-center text-sm text-primary-foreground font-medium"
                  >
                    Join Congregation
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
