"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border max-w-(--breakpoint-xl) mx-auto rounded-full z-50">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    className="hidden sm:inline-flex rounded-full"
                  >
                    <Link href="/login">Masuk</Link>
                  </Button>
                  <Button className="rounded-full">
                    <Link href="/signup">Daftar</Link>
                  </Button>
                </>
              ) : (
                <Button className="rounded-full">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
