import Link from "next/link";
import { Category } from "@/data/lms-data";
import {
  IconCode,
  IconSparkles,
  IconLayers,
  IconAward,
  IconUsers,
  IconShield,
  IconChevronRight,
} from "./icons";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const renderIcon = () => {
    switch (category.iconName) {
      case "code":
        return <IconCode className="h-6 w-6" />;
      case "ai":
        return <IconSparkles className="h-6 w-6" />;
      case "design":
        return <IconLayers className="h-6 w-6" />;
      case "business":
        return <IconAward className="h-6 w-6" />;
      case "marketing":
        return <IconUsers className="h-6 w-6" />;
      case "cloud":
      default:
        return <IconShield className="h-6 w-6" />;
    }
  };

  return (
    <Link
      href={`/courses?category=${category.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:bg-muted/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {renderIcon()}
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          {category.courseCount} Kursus
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
        <span>Eksplorasi Materi</span>
        <IconChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
