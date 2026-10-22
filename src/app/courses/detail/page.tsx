import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { LMS_COURSES } from "@/data/lms-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CurriculumAccordion } from "./curriculum-accordion";
import {
  IconStar,
  IconUsers,
  IconClock,
  IconBookOpen,
  IconAward,
  IconCheckCircle,
  IconShield,
  IconChevronRight,
  IconPlay,
  IconFileText,
} from "@/components/icons";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { id } = await searchParams;
  const course = id ? LMS_COURSES.find((c) => c.id === id) : LMS_COURSES[0];
  if (!course) {
    return {
      title: "Kursus Tidak Ditemukan | Elemes LMS",
    };
  }
  return {
    title: `${course.title} | Elemes LMS`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ searchParams }: PageProps) {
  const { locale, dict } = await getCurrentDictionary();
  const { id } = await searchParams;

  const course = id ? LMS_COURSES.find((c) => c.id === id) : LMS_COURSES[0];
  if (!course) {
    notFound();
  }
  const firstLessonId = course.modules[0]?.lessons[0]?.id || "les-1-1";

  const formattedPrice = course.isFree
    ? dict.common.free
    : new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(course.price);

  const formattedOriginalPrice = !course.isFree && course.originalPrice > course.price
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(course.originalPrice)
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Navbar dict={dict} />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {dict.nav.home}
            </Link>
            <IconChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <Link href="/courses" className="hover:text-foreground transition-colors">
              {dict.nav.courses}
            </Link>
            <IconChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="font-semibold text-foreground truncate max-w-xs sm:max-w-md">
              {course.title}
            </span>
          </nav>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left 2 Cols: Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header Overview */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {course.level}
                  </span>
                  {course.isTrending && (
                    <span className="rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                      Trending Kursus
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Diperbarui {course.lastUpdated}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  {course.title}
                </h1>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {course.subtitle}
                </p>

                {/* Rating & Instructor Summary */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <IconStar className="h-4 w-4 fill-current" />
                    <span>{course.rating.toFixed(2)}</span>
                    <span className="font-normal text-muted-foreground">
                      ({course.reviewCount} ulasan)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <IconUsers className="h-4 w-4" />
                    <span>{course.studentsCount.toLocaleString("id-ID")} siswa terdaftar</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span className="font-medium text-foreground">Bahasa:</span> {course.language}
                  </div>
                </div>

                {/* Instructor mini card */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted border border-border">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {course.instructor.role} • {course.instructor.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* What You Will Learn */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <IconAward className="h-5 w-5 text-primary" />
                  <span>{dict.courseDetail.outcomesTitle}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <IconCheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Syllabus / Curriculum */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {dict.courseDetail.curriculumTitle}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {course.modules.length} Modul • {course.totalLessons} Pelajaran • {course.durationHours} Jam Total Durasi
                    </p>
                  </div>
                </div>

                <CurriculumAccordion courseId={course.id} modules={course.modules} />
              </div>

              {/* Course Description */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-foreground">Deskripsi Lengkap</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>

                <div className="pt-4 border-t border-border/60">
                  <h3 className="text-sm font-bold text-foreground mb-2">
                    {dict.courseDetail.requirementsTitle}
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                    {course.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructor Full Bio */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-foreground">
                  {dict.courseDetail.instructorTitle}
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-muted border border-border shrink-0">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {course.instructor.role} • {course.instructor.company}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1.5">
                      <span>⭐ {course.instructor.rating.toFixed(2)} Rating</span>
                      <span>👥 {course.instructor.studentsCount.toLocaleString("id-ID")} Siswa</span>
                      <span>📚 {course.instructor.coursesCount} Kursus</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {course.instructor.bio}
                </p>
              </div>

              {/* Student Reviews */}
              {course.reviews.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
                  <h2 className="text-lg font-bold text-foreground">
                    {dict.courseDetail.reviewsTitle}
                  </h2>
                  <div className="space-y-4 divide-y divide-border/60">
                    {course.reviews.map((rev) => (
                      <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-foreground">{rev.authorName}</span>
                            <span className="text-muted-foreground"> • {rev.authorRole}</span>
                          </div>
                          <span className="text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <IconStar key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Enrollment Card */}
            <div className="lg:col-span-1 sticky top-20 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                {/* Preview Thumbnail Box with Play overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted group">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                    <Link
                      href={`/learn?courseId=${course.id}&lessonId=${firstLessonId}`}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
                    >
                      <IconPlay className="h-6 w-6 ml-0.5 fill-current" />
                    </Link>
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                    Pratinjau Materi
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-foreground tracking-tight">
                      {formattedPrice}
                    </span>
                    {formattedOriginalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formattedOriginalPrice}
                      </span>
                    )}
                  </div>

                  {/* Enroll CTA */}
                  <Link
                    href={`/learn?courseId=${course.id}&lessonId=${firstLessonId}`}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md hover:bg-primary-hover transition-colors"
                  >
                    {course.isFree ? dict.courseDetail.enrollFree : "Daftar & Mulai Belajar"}
                  </Link>

                  {/* Included features list */}
                  <div className="space-y-3 pt-4 border-t border-border/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {dict.courseDetail.courseIncludes}:
                    </h4>
                    <ul className="space-y-2.5 text-xs text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <IconClock className="h-4 w-4 text-primary" />
                        <span>{course.durationHours} jam total video materi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <IconBookOpen className="h-4 w-4 text-primary" />
                        <span>{course.totalLessons} pelajaran & modul interaktif</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <IconFileText className="h-4 w-4 text-primary" />
                        <span>{dict.courseDetail.includesResources}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <IconAward className="h-4 w-4 text-primary" />
                        <span>{dict.courseDetail.includesCertificate}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <IconShield className="h-4 w-4 text-primary" />
                        <span>{dict.courseDetail.includesAccess}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
