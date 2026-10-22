import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LMS_COURSES } from "@/data/lms-data";
import { LearningPlayerClient } from "./learning-player-client";

interface PageProps {
  searchParams: Promise<{ courseId?: string; lessonId?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { courseId } = await searchParams;
  const course = courseId ? LMS_COURSES.find((c) => c.id === courseId) : LMS_COURSES[0];
  if (!course) {
    return {
      title: "Ruang Belajar: Tidak Ditemukan | Elemes LMS",
    };
  }
  return {
    title: `Ruang Belajar: ${course.title} | Elemes LMS`,
    description: `Pelajari materi ${course.title} secara interaktif di Elemes LMS.`,
  };
}

export default async function LearnPage({ searchParams }: PageProps) {
  const { courseId, lessonId } = await searchParams;

  const course = courseId ? LMS_COURSES.find((c) => c.id === courseId) : LMS_COURSES[0];
  if (!course) {
    notFound();
  }
  const activeLessonId =
    lessonId || course.modules[0]?.lessons[0]?.id || "les-1-1";

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background text-sm text-muted-foreground">
          Menyiapkan ruang belajar interaktif...
        </div>
      }
    >
      <LearningPlayerClient
        course={course}
        initialLessonId={activeLessonId}
      />
    </Suspense>
  );
}
