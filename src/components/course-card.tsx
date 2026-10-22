import Image from "next/image";
import Link from "next/link";
import { Course } from "@/data/lms-data";
import { IconClock, IconBookOpen, IconStar, IconUsers } from "./icons";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const formattedPrice = course.isFree
    ? "Gratis"
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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges on top of thumbnail */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-lg bg-background/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-xs">
            {course.level}
          </span>
          {course.isTrending && (
            <span className="rounded-lg bg-amber-500/90 backdrop-blur-sm px-2 py-1 text-[11px] font-semibold text-white shadow-xs">
              Trending
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating & Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <IconStar className="h-3.5 w-3.5 fill-current" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-muted-foreground font-normal">({course.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <IconUsers className="h-3.5 w-3.5" />
            <span>{course.studentsCount.toLocaleString("id-ID")} siswa</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          <Link href={`/courses/detail?id=${course.id}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {course.title}
          </Link>
        </h3>

        {/* Subtitle / Description excerpt */}
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {course.subtitle}
        </p>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/60">
          <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="text-xs font-medium text-foreground truncate">
            {course.instructor.name}
          </span>
        </div>

        {/* Footer Meta & Price */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <IconClock className="h-3.5 w-3.5" />
              {course.durationHours}j
            </span>
            <span className="flex items-center gap-1">
              <IconBookOpen className="h-3.5 w-3.5" />
              {course.totalLessons} sesi
            </span>
          </div>

          <div className="flex items-baseline gap-1.5">
            {formattedOriginalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formattedOriginalPrice}
              </span>
            )}
            <span className={`text-sm font-bold ${course.isFree ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
