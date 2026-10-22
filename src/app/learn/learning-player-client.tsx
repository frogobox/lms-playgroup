"use client";

import { useState } from "react";
import Link from "next/link";
import { Course, Lesson } from "@/data/lms-data";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlay,
  IconCheckCircle,
  IconCheck,
  IconFileText,
  IconMessageSquare,
  IconSparkles,
  IconBookOpen,
  IconDownload,
  IconMenu,
  IconX,
} from "@/components/icons";

interface LearningPlayerClientProps {
  course: Course;
  initialLessonId: string;
}

const FALLBACK_LESSON: Lesson = {
  id: "les-intro",
  title: "Pengantar Materi",
  duration: "10:00",
  durationMinutes: 10,
  isPreview: true,
  summary: "Selamat datang di ruang pembelajaran interaktif.",
};

export function LearningPlayerClient({
  course,
  initialLessonId,
}: LearningPlayerClientProps) {
  // Find all lessons flattened for easy next/prev indexing
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const activeLessonIndex = Math.max(
    0,
    allLessons.findIndex((l) => l.id === initialLessonId)
  );

  const initialLesson = allLessons[activeLessonIndex] || allLessons[0] || FALLBACK_LESSON;
  const [currentLesson, setCurrentLesson] = useState<Lesson>(initialLesson);
  const [completedLessonIds, setCompletedLessonIds] = useState<Record<string, boolean>>({
    [initialLesson.id]: true,
  });

  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "discussion" | "quiz">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>("1.0x");
  const [downloadedResId, setDownloadedResId] = useState<string | null>(null);

  // Discussion state
  const [discussionQuestions, setDiscussionQuestions] = useState<Array<{ id: string; author: string; time: string; text: string }>>([
    {
      id: "q-1",
      author: "Aditya Pratama",
      time: "2 jam yang lalu",
      text: "Apakah Server Actions ini otomatis menggunakan HTTPS di production dan apakah ada batasan payload size?",
    },
    {
      id: "q-2",
      author: "Rizky Faisal (Instruktur)",
      time: "1 jam yang lalu",
      text: "Halo Aditya! Ya, di Next.js App Router default limit payload Server Action adalah 1MB (bisa dikonfigurasi di next.config.ts) dan selalu terenkripsi via HTTPS.",
    },
  ]);
  const [newQuestionText, setNewQuestionText] = useState("");

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Calculate progress
  const progressPercent = Math.round(
    (Object.keys(completedLessonIds).length / Math.max(1, allLessons.length)) * 100
  );

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setSidebarOpen(false);
    setIsPlaying(false);
  };

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleNextWithComplete = () => {
    setCompletedLessonIds((prev) => ({
      ...prev,
      [currentLesson.id]: true,
    }));
    if (nextLesson) {
      handleSelectLesson(nextLesson);
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setDiscussionQuestions((prev) => [
      {
        id: `q-${Date.now()}`,
        author: "Budi Santoso (Anda)",
        time: "Baru saja",
        text: newQuestionText.trim(),
      },
      ...prev,
    ]);
    setNewQuestionText("");
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
      {/* =================================================================
          TOP NAVIGATION BAR (Learning Room Focus Mode)
          ================================================================= */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/detail?id=${course.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Kembali ke Silabus</span>
          </Link>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-foreground truncate max-w-sm">
              {course.title}
            </span>
            <span className="text-[11px] text-muted-foreground truncate max-w-xs">
              {currentLesson.title}
            </span>
          </div>
        </div>

        {/* Progress Bar & Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[11px] font-bold text-foreground">
                Kemajuan Belajar
              </span>
              <span className="text-[10px] text-muted-foreground">
                {Object.keys(completedLessonIds).length} dari {allLessons.length} selesai ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 w-20 sm:w-28 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted lg:hidden cursor-pointer"
          >
            {sidebarOpen ? <IconX className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
            <span className="hidden sm:inline">Silabus</span>
          </button>
        </div>
      </header>

      {/* =================================================================
          BODY SPLIT: Left Player/Tabs & Right Syllabus Sidebar
          ================================================================= */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Pane (Player & Tabs) */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Custom Interactive Video Frame */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-xl border border-border/40">
              {/* Screen overlay mock */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 text-white bg-gradient-to-t from-black/80 via-transparent to-black/40">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold backdrop-blur-xs">
                    Elemes Player HD 1080p
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(e.target.value)}
                      className="rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white focus:outline-none cursor-pointer"
                    >
                      <option value="0.75x">0.75x</option>
                      <option value="1.0x">1.0x</option>
                      <option value="1.25x">1.25x</option>
                      <option value="1.5x">1.5x</option>
                      <option value="2.0x">2.0x</option>
                    </select>
                  </div>
                </div>

                {/* Center Play Button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-2xl hover:scale-110 hover:bg-primary transition-all cursor-pointer"
                    aria-label={isPlaying ? "Jeda Video" : "Putar Video"}
                  >
                    <IconPlay className="h-7 w-7 ml-1 fill-current" />
                  </button>
                </div>

                {/* Bottom Video Controls Mock */}
                <div className="space-y-2">
                  <div className="h-1.5 w-full rounded-full bg-white/20 cursor-pointer overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-2/5" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <span>{isPlaying ? "05:12" : "00:00"}</span>
                      <span>/</span>
                      <span>{currentLesson.duration}</span>
                    </div>
                    <span className="font-semibold text-xs text-white">
                      {currentLesson.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Title & Quick Control Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  {currentLesson.title}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Durasi {currentLesson.duration} • {course.title}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleToggleComplete(currentLesson.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    completedLessonIds[currentLesson.id]
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconCheck className="h-4 w-4" />
                  <span>
                    {completedLessonIds[currentLesson.id] ? "Selesai" : "Tandai Selesai"}
                  </span>
                </button>

                {nextLesson && (
                  <button
                    type="button"
                    onClick={handleNextWithComplete}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Lanjut</span>
                    <IconChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <div className="flex items-center gap-6 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "overview"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconBookOpen className="h-4 w-4" />
                  <span>Rangkuman</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("resources")}
                  className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "resources"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconFileText className="h-4 w-4" />
                  <span>Lampiran ({currentLesson.resources?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("discussion")}
                  className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "discussion"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconMessageSquare className="h-4 w-4" />
                  <span>Diskusi ({discussionQuestions.length})</span>
                </button>

                {currentLesson.quiz && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("quiz")}
                    className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "quiz"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <IconSparkles className="h-4 w-4 text-amber-500" />
                    <span>Kuis Evaluasi</span>
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content Panels */}
            <div className="pb-16">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {currentLesson.summary}
                  </p>
                  {currentLesson.notesMarkdown && (
                    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Catatan Teknis Instruktur:
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-mono">
                        {currentLesson.notesMarkdown}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-3">
                  {currentLesson.resources && currentLesson.resources.length > 0 ? (
                    currentLesson.resources.map((res) => (
                      <div
                        key={res.id}
                        className="flex items-center justify-between rounded-xl border border-border bg-card p-4 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                            {res.type}
                          </div>
                          <div>
                            <span className="font-bold text-foreground block">
                              {res.title}
                            </span>
                            {res.size && (
                              <span className="text-muted-foreground">{res.size}</span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setDownloadedResId(res.id);
                            setTimeout(() => setDownloadedResId(null), 2500);
                          }}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold text-xs transition-colors cursor-pointer ${
                            downloadedResId === res.id
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-secondary text-foreground hover:bg-muted"
                          }`}
                        >
                          {downloadedResId === res.id ? (
                            <>
                              <IconCheck className="h-3.5 w-3.5" />
                              <span>Tersimpan</span>
                            </>
                          ) : (
                            <>
                              <IconDownload className="h-3.5 w-3.5" />
                              <span>Unduh</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Tidak ada berkas unduhan tambahan untuk materi ini.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "discussion" && (
                <div className="space-y-6">
                  {/* New Question Form */}
                  <form onSubmit={handleAddQuestion} className="space-y-3">
                    <textarea
                      rows={3}
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Ajukan pertanyaan mengenai materi ini kepada instruktur..."
                      className="w-full rounded-xl border border-input bg-card p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
                      >
                        Kirim Pertanyaan
                      </button>
                    </div>
                  </form>

                  {/* Thread List */}
                  <div className="space-y-4 divide-y divide-border/60">
                    {discussionQuestions.map((item) => (
                      <div key={item.id} className="pt-4 first:pt-0 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-foreground">{item.author}</span>
                          <span className="text-muted-foreground">{item.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "quiz" && currentLesson.quiz && (
                <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Kuis Pemahaman Materi
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      {currentLesson.quiz.question}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {currentLesson.quiz.options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      let optionStyle = "border-border hover:bg-muted/40";
                      if (quizSubmitted) {
                        if (idx === currentLesson.quiz?.correctIndex) {
                          optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                        } else if (isSelected) {
                          optionStyle = "border-destructive bg-destructive/10 text-destructive";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-primary bg-primary/10 text-primary font-semibold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setSelectedQuizOption(idx)}
                          className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs sm:text-sm transition-all cursor-pointer ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && idx === currentLesson.quiz?.correctIndex && (
                            <IconCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      type="button"
                      disabled={selectedQuizOption === null}
                      onClick={() => setQuizSubmitted(true)}
                      className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover disabled:opacity-50 transition-all cursor-pointer"
                    >
                      Kirim Jawaban
                    </button>
                  ) : (
                    <div className="rounded-xl bg-muted/40 p-4 space-y-2 border border-border/60">
                      <div className="flex items-center gap-2">
                        {selectedQuizOption === currentLesson.quiz.correctIndex ? (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            🎉 Jawaban Anda Benar!
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-destructive">
                            ⚠️ Jawaban Belum Tepat.
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Pembahasan:</strong>{" "}
                        {currentLesson.quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================================
            RIGHT SYLLABUS SIDEBAR (Desktop Fixed, Mobile Slide-Over)
            ================================================================= */}
        <aside
          className={`absolute top-0 right-0 bottom-0 z-30 w-80 sm:w-96 border-l border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0 overflow-y-auto ${
            sidebarOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Silabus Kursus
            </h3>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 space-y-4">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase px-2">
                  Modul {modIdx + 1}: {mod.title}
                </span>

                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLesson.id;
                    const isCompleted = Boolean(completedLessonIds[lesson.id]);

                    return (
                      <div
                        key={lesson.id}
                        className={`flex w-full items-center justify-between rounded-xl p-2.5 text-xs transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2 flex-1">
                          <button
                            type="button"
                            onClick={() => handleToggleComplete(lesson.id)}
                            className="focus:outline-none cursor-pointer p-0.5"
                            aria-label={`Tandai status ${lesson.title}`}
                          >
                            {isCompleted ? (
                              <IconCheckCircle
                                className={`h-4 w-4 shrink-0 ${
                                  isActive ? "text-primary-foreground" : "text-emerald-500"
                                }`}
                              />
                            ) : (
                              <div
                                className={`h-4 w-4 rounded-full border shrink-0 ${
                                  isActive ? "border-primary-foreground/50" : "border-border"
                                }`}
                              />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectLesson(lesson)}
                            className="truncate text-left flex-1 focus:outline-none cursor-pointer"
                          >
                            <span className="truncate">{lesson.title}</span>
                          </button>
                        </div>

                        <span
                          className={`text-[10px] shrink-0 ${
                            isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
