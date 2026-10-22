import Link from "next/link";
import { getCurrentDictionary } from "@/lib/i18n-server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IconBookOpen } from "@/components/icons";

export default async function NotFound() {
  const { locale, dict } = await getCurrentDictionary();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Navbar dict={dict} />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center text-center max-w-md space-y-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <IconBookOpen className="h-8 w-8" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              {dict.error.notFound}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {dict.error.notFoundDescription}
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover shadow-sm transition-colors"
          >
            {dict.error.goHome}
          </Link>
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
