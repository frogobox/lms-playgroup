import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { MOCK_STUDENT_DASHBOARD, LMS_COURSES } from "@/data/lms-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StudentDashboardClient } from "./student-dashboard-client";
import { IconChevronRight } from "@/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getCurrentDictionary();
  return {
    title: `Dasbor Siswa | ${dict.common.appName}`,
    description: dict.dashboard.subtitle,
  };
}

export default async function DashboardPage() {
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
            <span className="font-semibold text-foreground">{dict.nav.dashboard}</span>
          </nav>

          {/* Student Dashboard Content */}
          <StudentDashboardClient
            data={MOCK_STUDENT_DASHBOARD}
            allCourses={LMS_COURSES}
            dict={dict}
          />
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
