import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { NavItem, SubLink, UserProfile } from "./mock.data";
import { ChevronDown, Menu } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@eastgate/ui/components/avatar";
import { Button } from "@eastgate/ui/components/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@eastgate/ui/components/collapsible";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
} from "@eastgate/ui/components/sheet";
import { TypographyLarge } from "@eastgate/ui/components/typography";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@eastgate/ui/components/dropdown-menu";

interface HeaderProps {
  navTree: NavItem[];
  isAuthenticated: boolean;
  userProfile?: UserProfile;
}

export function Header({ navTree, isAuthenticated, userProfile }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: Branding/Logo */}
          <div className="flex shrink-0">
            <Link
              to="/"
              className="text-base sm:text-lg font-bold tracking-tight text-foreground select-none"
            >
              PBC EASTGATE
            </Link>
          </div>

{/* CENTER: Desktop Navigation Layout */}
          <nav className="hidden md:flex items-center gap-x-1">
            {navTree.map(item =>
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-x-1 text-sm font-medium px-3 py-2 text-muted-foreground hover:text-foreground bg-transparent outline-none transition-colors data-[state=open]:text-foreground group">
                      <span>{item.label}</span>
                      <ChevronDown 
                        className="h-3 w-3 text-muted-foreground transition duration-200 group-data-[state=open]:rotate-180" 
                        aria-hidden="true" 
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={6}
                    className="w-55 gap-1 p-2 bg-popover rounded-md border border-border shadow-md flex flex-col"
                  >
                    {item.children.map((child: SubLink) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link
                          to={child.href}
                          className="block select-none rounded-sm px-3 py-2 text-xs sm:text-sm text-popover-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href || "/"}
                  className="inline-flex items-center text-sm font-medium px-3 py-2 bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground focus:bg-transparent transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* RIGHT: Desktop Auth Cluster */}
          <div className="hidden md:flex items-center gap-x-4">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-x-2 text-sm text-foreground group outline-none"
              >
                <Avatar className="h-8 w-8 border border-border">
                  {userProfile?.avatarUrl && (
                    <AvatarImage
                      src={userProfile.avatarUrl}
                      alt={userProfile.name}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="text-xs">
                    {userProfile?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs sm:text-sm group-hover:text-muted-foreground transition-colors">
                  {userProfile?.name}
                </span>
              </Link>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/" className="text-xs sm:text-sm font-medium">
                    Join Congregation
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* MOBILE TRIGGER AND PORTAL VIEWPORT PACKAGE */}
          <div className="flex md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Toggle main menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:max-w-sm p-6 overflow-y-auto"
              >
                <SheetHeader className="text-left mb-6">
                  <SheetTitle>
                    <TypographyLarge className="text-sm sm:text-base font-bold tracking-tight text-foreground">
                      PBC EASTGATE
                    </TypographyLarge>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-y-4">
                  {navTree.map(item => (
                    <div key={item.label} className="w-full">
                      {item.children ? (
                        <Collapsible className="group/collapsible w-full">
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-2 h-auto text-sm sm:text-base font-semibold text-foreground hover:bg-transparent"
                            >
                              <span>{item.label}</span>
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-3 border-l border-border flex flex-col gap-y-1 mt-1 transition-all">
                            {item.children.map((child: SubLink) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="rounded-md px-2 py-1.5 text-xs sm:text-sm text-muted-foreground hover:bg-muted hover:text-foreground block transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
                          to={item.href || "/"}
                          onClick={() => setIsMobileOpen(false)}
                          className="rounded-md p-2 text-sm sm:text-base font-semibold text-foreground hover:bg-muted block transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Mobile Dynamic Account Cluster Footer */}
                  <div className="pt-6 mt-2 border-t border-border flex flex-col gap-y-3">
                    {isAuthenticated ? (
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-x-3 rounded-md p-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Avatar className="h-8 w-8 border border-border">
                          {userProfile?.avatarUrl && (
                            <AvatarImage
                              src={userProfile.avatarUrl}
                              alt={userProfile.name}
                            />
                          )}
                          <AvatarFallback className="text-xs">
                            {userProfile?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs sm:text-sm font-medium">
                          Dashboard Profile ({userProfile?.name})
                        </span>
                      </Link>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-center"
                          asChild
                        >
                          <Link to="/" onClick={() => setIsMobileOpen(false)}>
                            Sign In
                          </Link>
                        </Button>
                        <Button
                          variant="default"
                          className="w-full justify-center"
                          asChild
                        >
                          <Link to="/" onClick={() => setIsMobileOpen(false)}>
                            Join Congregation
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
