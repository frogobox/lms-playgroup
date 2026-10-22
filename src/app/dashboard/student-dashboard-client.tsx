"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StudentDashboard, Course } from "@/data/lms-data";
import {
  IconBookOpen,
  IconAward,
  IconClock,
  IconSparkles,
  IconPlay,
  IconCheckCircle,
} from "@/components/icons";

interface StudentDashboardClientProps {
  data: StudentDashboard;
  allCourses: Course[];
  dict: {
    dashboard: {
      welcome: string;
      subtitle: string;
      streakDays: string;
      hoursLearned: string;
      certificatesEarned: string;
      averageScore: string;
      tabActive: string;
      tabCompleted: string;
      tabDeadlines: string;
      continueCta: string;
      completedBadge: string;
      emptyActive: string;
      emptyDeadlines: string;
    };
  };
}

export function StudentDashboardClient({
  data,
  allCourses,
  dict,
}: StudentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "deadlines">("active");
  const [verifiedCertId, setVerifiedCertId] = useState<string | null>(null);

  const enrolledCourseDetails = data.enrolledCourses.map((enrolled) => {
    const course = allCourses.find((c) => c.id === enrolled.courseId);
    return {
      ...enrolled,
      course,
    };
  }).filter((item) => item.course !== undefined);

  const activeCourses = enrolledCourseDetails.filter((i) => i.progressPercent < 100);

  return (
    <div className="space-y-8">
      {/* Student Welcome Profile Banner */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl bg-muted border border-border shrink-0">
              <Image
                src={data.avatar}
                alt={data.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  {dict.dashboard.welcome} {data.name}
                </h1>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Aktif
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{data.role}</p>
              <p className="text-xs text-muted-foreground/80">{data.email}</p>
            </div>
          </div>

          {/* Streak Badge */}
          <div className="flex items-center gap-3 rounded-2xl bg-primary/10 border border-primary/20 px-5 py-3 self-start sm:self-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
              🔥
            </div>
            <div>
              <span className="text-base font-extrabold text-foreground block">
                {data.streakDays} {dict.dashboard.streakDays}
              </span>
              <span className="text-xs text-primary font-medium">
                Pertahankan ritme belajar Anda!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">{dict.dashboard.tabActive}</span>
            <IconBookOpen className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {activeCourses.length}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">{dict.dashboard.hoursLearned}</span>
            <IconClock className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {data.totalHoursLearned}j
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">{dict.dashboard.certificatesEarned}</span>
            <IconAward className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {data.certificatesEarned}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">{dict.dashboard.averageScore}</span>
            <IconSparkles className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {data.averageQuizScore}%
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-border">
        <div className="flex items-center gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "active"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{dict.dashboard.tabActive}</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              {activeCourses.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "completed"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{dict.dashboard.tabCompleted}</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              {data.certificates.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("deadlines")}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "deadlines"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{dict.dashboard.tabDeadlines}</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              {data.upcomingDeadlines.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCourses.map((item) => {
                  const course = item.course!;
                  return (
                    <div
                      key={course.id}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="rounded-md bg-secondary px-2 py-0.5 font-semibold">
                            {course.level}
                          </span>
                          <span>Akses terakhir: {item.lastAccessed}</span>
                        </div>

                        <h3 className="text-base font-bold text-foreground">
                          {course.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-1">
                          Instruktur: {course.instructor.name}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-2 border-t border-border/60">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-muted-foreground">Kemajuan</span>
                          <span className="text-primary">{item.progressPercent}% Selesai</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-2">
                        <Link
                          href={`/learn?courseId=${course.id}&lessonId=${item.currentLessonId}`}
                          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors"
                        >
                          <IconPlay className="h-3.5 w-3.5 fill-current" />
                          <span>{dict.dashboard.continueCta}</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
                {dict.dashboard.emptyActive}
              </div>
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-4">
            {data.certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                    <IconAward className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {cert.courseTitle}
                      </h3>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {cert.grade}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ID Kredensial: <span className="font-mono">{cert.credentialId}</span> • Diterbitkan: {cert.issuedDate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 self-end sm:self-auto">
                  {verifiedCertId === cert.id ? (
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <IconCheckCircle className="h-4 w-4" />
                      Terverifikasi Valid
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVerifiedCertId(cert.id)}
                      className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      Verifikasi Sertifikat
                    </button>
                  )}
                  <Link
                    href={`/courses/detail?id=${cert.courseId}`}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                  >
                    Ulas Materi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "deadlines" && (
          <div className="space-y-3">
            {data.upcomingDeadlines.length > 0 ? (
              data.upcomingDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                      <IconClock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground block">{dl.title}</span>
                      <span className="text-muted-foreground">{dl.courseTitle}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">
                      Batas: {dl.dueDate}
                    </span>
                    <Link
                      href={`/learn?courseId=${dl.courseId}&lessonId=${dl.lessonId || "les-1-1"}`}
                      className="rounded-lg bg-secondary px-3 py-1 font-semibold text-foreground hover:bg-muted transition-colors"
                    >
                      Kerjakan
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
                {dict.dashboard.emptyDeadlines}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
