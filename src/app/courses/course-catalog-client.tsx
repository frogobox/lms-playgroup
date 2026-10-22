"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Course, Category } from "@/data/lms-data";
import { CourseCard } from "@/components/course-card";
import { IconSearch, IconX, IconBookOpen } from "@/components/icons";

interface CourseCatalogClientProps {
  initialCourses: Course[];
  categories: Category[];
  dict: {
    courses: {
      searchPlaceholder: string;
      filterCategory: string;
      filterLevel: string;
      filterPrice: string;
      allLevels: string;
      allPrices: string;
      freeOnly: string;
      paidOnly: string;
      sortBy: string;
      sortPopular: string;
      sortRating: string;
      sortNewest: string;
      resultsFound: string;
      noCoursesTitle: string;
      noCoursesDesc: string;
      resetFilters: string;
    };
  };
}

export function CourseCatalogClient({
  initialCourses,
  categories,
  dict,
}: CourseCatalogClientProps) {
  const searchParams = useSearchParams();
  const initialCategoryQuery = searchParams.get("category") || "";
  const initialSearchQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryQuery);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest">("popular");

  const filteredCourses = useMemo(() => {
    return initialCourses
      .filter((course) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchDesc = course.description.toLowerCase().includes(q);
          const matchTags = course.tags.some((t) => t.toLowerCase().includes(q));
          const matchInstructor = course.instructor.name.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchTags && !matchInstructor) return false;
        }

        // Category filter
        if (selectedCategory && selectedCategory !== "all") {
          const categoryObj = categories.find((c) => c.slug === selectedCategory);
          if (categoryObj && course.categoryId !== categoryObj.id) return false;
        }

        // Level filter
        if (selectedLevel !== "all") {
          const lvl = selectedLevel.toLowerCase();
          const matchLevel =
            course.level.toLowerCase() === lvl ||
            course.levelEn.toLowerCase() === lvl;
          if (!matchLevel) return false;
        }

        // Price filter
        if (selectedPrice === "free") {
          if (!course.isFree) return false;
        } else if (selectedPrice === "paid") {
          if (course.isFree) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        if (sortBy === "newest") {
          return b.id.localeCompare(a.id);
        }
        // default "popular"
        return b.studentsCount - a.studentsCount;
      });
  }, [initialCourses, categories, searchQuery, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedPrice("all");
    setSortBy("popular");
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    (selectedCategory !== "all" && Boolean(selectedCategory)) ||
    selectedLevel !== "all" ||
    selectedPrice !== "all";

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xs">
        {/* Search Input Bar */}
        <div className="relative w-full">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.courses.searchPlaceholder}
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <IconX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Chips & Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Level Dropdown */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">{dict.courses.allLevels}</option>
              <option value="Pemula">Pemula</option>
              <option value="Menengah">Menengah</option>
              <option value="Mahir">Mahir</option>
            </select>

            {/* Price Dropdown */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">{dict.courses.allPrices}</option>
              <option value="free">{dict.courses.freeOnly}</option>
              <option value="paid">{dict.courses.paidOnly}</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
              >
                <IconX className="h-3 w-3" />
                <span>{dict.courses.resetFilters}</span>
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{dict.courses.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "popular" | "rating" | "newest")}
              className="rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="popular">{dict.courses.sortPopular}</option>
              <option value="rating">{dict.courses.sortRating}</option>
              <option value="newest">{dict.courses.sortNewest}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {dict.courses.resultsFound.replace("{count}", filteredCourses.length.toString())}
        </span>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <IconBookOpen className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">
              {dict.courses.noCoursesTitle}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              {dict.courses.noCoursesDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors cursor-pointer"
          >
            {dict.courses.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}
