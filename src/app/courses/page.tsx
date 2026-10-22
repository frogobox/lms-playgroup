import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { LMS_CATEGORIES, LMS_COURSES } from "@/data/lms-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CourseCatalogClient } from "./course-catalog-client";
import { IconChevronRight } from "@/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getCurrentDictionary();
  return {
    title: `${dict.courses.title} | ${dict.common.appName}`,
    description: dict.courses.subtitle,
  };
}

export default async function CoursesPage() {
  const { locale, dict } = await getCurrentDictionary();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Navbar dict={dict} />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {dict.nav.home}
            </Link>
            <IconChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="font-semibold text-foreground">{dict.nav.courses}</span>
          </nav>

          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {dict.courses.title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {dict.courses.subtitle}
            </p>
          </div>

          {/* Interactive Catalog Client wrapped in Suspense for searchParams hydration */}
          <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Memuat katalog kursus...</div>}>
            <CourseCatalogClient
              initialCourses={LMS_COURSES}
              categories={LMS_CATEGORIES}
              dict={dict}
            />
          </Suspense>
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
