import Link from "next/link";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { generateWebsiteJsonLd } from "@/lib/seo";
import { LMS_CATEGORIES, LMS_COURSES } from "@/data/lms-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { CategoryCard } from "@/components/category-card";
import { PresetSelector } from "@/components/preset-selector";
import {
  IconGraduationCap,
  IconSparkles,
  IconBookOpen,
  IconAward,
  IconShield,
  IconUsers,
  IconChevronRight,
} from "@/components/icons";

export default async function Home() {
  const { locale, dict } = await getCurrentDictionary();
  const websiteJsonLd = generateWebsiteJsonLd(locale);

  const featuredCourses = LMS_COURSES.filter((c) => c.isFeatured || c.isTrending).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />

      {/* Global Navbar */}
      <Navbar dict={dict} />

      <main className="flex-1">
        {/* =================================================================
            HERO SECTION
            ================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <IconSparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Universal LMS Template</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Platform Pembelajaran Modern untuk Masa Depan Anda
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Template Learning Management System universal yang dirancang untuk kampus, bootcamp intensif, pelatihan korporat, hingga kursus mandiri. Cepat, modular, dan siap digunakan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
                <Link
                  href="/courses"
                  className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary-hover transition-colors"
                >
                  <IconBookOpen className="h-4 w-4" />
                  <span>Jelajahi Katalog Kursus</span>
                </Link>
                <Link
                  href="/learn?courseId=elemes-next16-fullstack&lessonId=les-1-1"
                  className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <IconGraduationCap className="h-4 w-4 text-primary" />
                  <span>Coba Ruang Belajar</span>
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full border-t border-border/60 mt-8 text-left sm:text-center">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    250+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Kursus Terkurasi
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    45.000+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Pelajar Aktif
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    98.4%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tingkat Kepuasan
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    100%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Mobile & PWA Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            PRESET SELECTOR SHOWCASE (Solusi Kustomisasi Multi-Institusi)
            ================================================================= */}
        <section className="py-16 md:py-24 bg-muted/20 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {dict.home.presetsBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {dict.home.presetsTitle}
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {dict.home.presetsSubtitle}
                </p>
              </div>
            </div>

            <PresetSelector />
          </div>
        </section>

        {/* =================================================================
            FEATURED CATEGORIES
            ================================================================= */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {dict.home.categoriesBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {dict.home.categoriesTitle}
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {dict.home.categoriesSubtitle}
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <span>Lihat Semua Kategori</span>
                <IconChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LMS_CATEGORIES.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            FEATURED & POPULAR COURSES
            ================================================================= */}
        <section className="py-16 md:py-24 bg-muted/20 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {dict.home.featuredBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {dict.home.featuredTitle}
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {dict.home.featuredSubtitle}
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <span>Lihat Semua ({LMS_COURSES.length}) Kursus</span>
                <IconChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            CAREER PATHWAYS (Jalur Pembelajaran Berkelanjutan)
            ================================================================= */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {dict.home.pathwaysBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {dict.home.pathwaysTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {dict.home.pathwaysSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-foreground">Fullstack Web Architect</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Kuasai fundamental TypeScript, Next.js 16 App Router, REST/GraphQL API, arsitektur database, dan deployment container Docker.
                </p>
                <div className="pt-2 text-xs text-primary font-semibold flex items-center gap-1">
                  <span>3 Kursus • 96 Jam</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-foreground">Applied AI & Agent Engineer</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Membangun sistem AI generatif otonom, integrasi function calling Gemini Flash, memori agent, dan evaluasi anti-halusinasi data.
                </p>
                <div className="pt-2 text-xs text-primary font-semibold flex items-center gap-1">
                  <span>4 Kursus • 112 Jam</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-foreground">Enterprise Product Designer</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Menyusun design token terukur, Figma library, standar aksesibilitas WCAG 2.1 AA, serta kolaborasi sinkron dengan developer frontend.
                </p>
                <div className="pt-2 text-xs text-primary font-semibold flex items-center gap-1">
                  <span>3 Kursus • 80 Jam</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            WHY ELEMES LMS (Nilai Arsitektur & Keunggulan)
            ================================================================= */}
        <section className="py-16 md:py-24 bg-muted/20 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {dict.home.whyBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {dict.home.whyTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {dict.home.whySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconShield className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Keamanan Server-Only</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enkripsi kriptografis AES-256-GCM, penyamaran ID Sqids, dan perlindungan bot otomatis terpasang langsung di layer proxy.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconAward className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">PWA & Offline Ready</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ditenagai Serwist Service Worker modern untuk instalasi instan pada Android, iOS, Windows, dan macOS tanpa app store barrier.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconSparkles className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Tailwind CSS v4</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tanpa konfigurasi usang. Menggunakan engine CSS-first modern dengan token variabel semantik dan dukungan dark mode bawaan.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconUsers className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">i18n & Aksesibilitas</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dukungan multi-bahasa cookie-based (ID/EN) tanpa URL bloat, ramah screen reader, dan kontras warna WCAG AA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            BOTTOM CTA BANNER
            ================================================================= */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8 sm:p-12 text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {dict.home.ctaTitle}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {dict.home.ctaSubtitle}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary-hover transition-colors"
                >
                  {dict.home.ctaButton}
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-8 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Buka Dasbor Siswa
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
