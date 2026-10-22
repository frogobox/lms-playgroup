"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconGraduationCap, IconSearch, IconMenu, IconX, IconBookOpen } from "./icons";

interface NavbarProps {
  dict: {
    common: {
      appName: string;
      search: string;
    };
    nav: {
      home: string;
      courses: string;
      dashboard: string;
      searchPlaceholder: string;
    };
  };
}

export function Navbar({ dict }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/courses", label: dict.nav.courses },
    { href: "/dashboard", label: dict.nav.dashboard },
    { href: "/learn?courseId=elemes-next16-fullstack&lessonId=les-1-1", label: "Ruang Belajar" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <IconGraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground leading-none">
                {dict.common.appName}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-0.5">
                Modern Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi Utama">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.split("?")[0]!));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar & Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-64 lg:w-72">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.nav.searchPlaceholder}
              className="w-full rounded-xl border border-input bg-card py-1.5 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </form>

          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          >
            Portal Siswa
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/courses"
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Cari Kursus"
          >
            <IconSearch className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka Menu Navigasi"
          >
            {mobileMenuOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.nav.searchPlaceholder}
              className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </form>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <IconBookOpen className="h-4 w-4 text-muted-foreground" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-border">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full h-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-colors"
            >
              Masuk ke Dasbor Siswa
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
