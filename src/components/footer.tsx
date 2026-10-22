import Link from "next/link";
import { IconGraduationCap, IconShield, IconAward, IconBookOpen } from "./icons";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import { LanguageSwitcher } from "@/app/_components/language-switcher";
import type { Locale } from "@/i18n/config";

interface FooterProps {
  locale?: Locale;
  dict: {
    common: {
      appName: string;
    };
    footer: {
      copyright: string;
      madeWith: string;
      tagline: string;
      coursesLink: string;
      pathwaysLink: string;
      dashboardLink: string;
      privacy: string;
      terms: string;
    };
  };
}

export function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear().toString();
  const copyrightText = dict.footer.copyright.replace("{year}", currentYear);

  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-sm text-foreground transition-colors mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <IconGraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                {dict.common.appName}
              </span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              {dict.footer.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <IconShield className="h-3.5 w-3.5 text-primary" /> Next.js 16.3 (App Router)
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <IconAward className="h-3.5 w-3.5 text-primary" /> React 19 Strict
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium">
                <IconBookOpen className="h-3.5 w-3.5 text-primary" /> Tailwind CSS v4
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Eksplorasi
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-foreground transition-colors">
                  {dict.footer.coursesLink}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  {dict.footer.dashboardLink}
                </Link>
              </li>
              <li>
                <Link
                  href="/learn?courseId=elemes-next16-fullstack&lessonId=les-1-1"
                  className="hover:text-foreground transition-colors"
                >
                  Ruang Belajar Interaktif
                </Link>
              </li>
            </ul>
          </div>

          {/* Settings & Accessibility */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Pengaturan Tampilan
            </h4>
            <div className="space-y-2 pt-1">
              <ThemeSwitcher />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-xs text-muted-foreground">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            <span>{dict.footer.privacy}</span>
            <span>{dict.footer.terms}</span>
            <span className="text-muted-foreground/60">{dict.footer.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
