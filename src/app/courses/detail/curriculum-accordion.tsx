"use client";

import { useState } from "react";
import Link from "next/link";
import { CourseModule } from "@/data/lms-data";
import {
  IconChevronDown,
  IconPlay,
  IconClock,
  IconFileText,
  IconSparkles,
} from "@/components/icons";

interface CurriculumAccordionProps {
  courseId: string;
  modules: CourseModule[];
}

export function CurriculumAccordion({ courseId, modules }: CurriculumAccordionProps) {
  // First module open by default if available
  const [openModuleIds, setOpenModuleIds] = useState<Record<string, boolean>>(() => {
    const firstId = modules[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-3">
      {modules.map((mod, index) => {
        const isOpen = Boolean(openModuleIds[mod.id]);
        const totalDuration = mod.lessons.reduce((acc, l) => acc + l.durationMinutes, 0);

        return (
          <div
            key={mod.id}
            className="overflow-hidden rounded-2xl border border-border bg-card transition-colors"
          >
            {/* Header Accordion Button */}
            <button
              type="button"
              onClick={() => toggleModule(mod.id)}
              className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mod.lessons.length} Pelajaran • ~{totalDuration} Menit
                  </p>
                </div>
              </div>

              <IconChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-foreground" : ""
                }`}
              />
            </button>

            {/* Lesson List */}
            {isOpen && (
              <div className="border-t border-border/60 bg-muted/20 px-4 py-2 sm:px-5 divide-y divide-border/40">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2"
                  >
                    <div className="flex items-start sm:items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background border border-border text-muted-foreground mt-0.5 sm:mt-0">
                        {lesson.quiz ? (
                          <IconSparkles className="h-3.5 w-3.5 text-amber-500" />
                        ) : (
                          <IconPlay className="h-3 w-3 text-primary" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-medium text-foreground">
                          {lesson.title}
                        </span>
                        {lesson.resources && lesson.resources.length > 0 && (
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <IconFileText className="h-3 w-3" />
                            <span>{lesson.resources.length} Lampiran Berkas</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto pl-8 sm:pl-0">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <IconClock className="h-3 w-3" />
                        {lesson.duration}
                      </span>

                      {lesson.isPreview ? (
                        <Link
                          href={`/learn?courseId=${courseId}&lessonId=${lesson.id}`}
                          className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                        >
                          Pratinjau
                        </Link>
                      ) : (
                        <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          Terkunci
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
