export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  iconName: "code" | "design" | "business" | "ai" | "marketing" | "cloud";
  courseCount: number;
  badgeColor: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "PDF" | "ZIP" | "LINK";
  size?: string;
  url: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  durationMinutes: number;
  isPreview: boolean;
  videoUrl?: string;
  summary: string;
  notesMarkdown?: string;
  resources?: ResourceItem[];
  quiz?: QuizQuestion;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseReview {
  id: string;
  authorName: string;
  authorRole: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categoryId: string;
  level: "Pemula" | "Menengah" | "Mahir";
  levelEn: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewCount: number;
  studentsCount: number;
  durationHours: number;
  totalLessons: number;
  price: number;
  originalPrice: number;
  isFree: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  thumbnail: string;
  instructor: Instructor;
  tags: string[];
  outcomes: string[];
  requirements: string[];
  modules: CourseModule[];
  reviews: CourseReview[];
  lastUpdated: string;
  language: string;
}

export interface LMSPreset {
  id: "campus" | "bootcamp" | "corporate" | "creator";
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  keyFeatures: string[];
  targetUsers: string;
}

export interface StudentDashboard {
  name: string;
  email: string;
  role: string;
  avatar: string;
  streakDays: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  averageQuizScore: number;
  enrolledCourses: {
    courseId: string;
    progressPercent: number;
    currentLessonId: string;
    lastAccessed: string;
  }[];
  upcomingDeadlines: {
    id: string;
    title: string;
    courseId: string;
    lessonId?: string;
    courseTitle: string;
    dueDate: string;
    type: "Kuis" | "Tugas" | "Proyek Akhir";
  }[];
  certificates: {
    id: string;
    courseId: string;
    courseTitle: string;
    issuedDate: string;
    credentialId: string;
    grade: string;
  }[];
}

/* =========================================================================
   DUMMY DATASETS
   ========================================================================= */

export const LMS_CATEGORIES: Category[] = [
  {
    id: "cat-tech",
    slug: "teknologi-koding",
    name: "Rekayasa Perangkat Lunak",
    nameEn: "Software Engineering",
    description: "Kuasai Fullstack Next.js, TypeScript, Arsitektur Cloud, dan Mobile App.",
    iconName: "code",
    courseCount: 42,
    badgeColor: "teal",
  },
  {
    id: "cat-ai",
    slug: "data-ai",
    name: "Data Science & AI",
    nameEn: "Data Science & AI",
    description: "Machine Learning terapan, LLM, prompt engineering, dan analitik data.",
    iconName: "ai",
    courseCount: 28,
    badgeColor: "indigo",
  },
  {
    id: "cat-design",
    slug: "desain-produk",
    name: "Desain Produk & UI/UX",
    nameEn: "Product Design & UI/UX",
    description: "Design system modern, prototyping interaktif, micro-interaction, dan riset pengguna.",
    iconName: "design",
    courseCount: 35,
    badgeColor: "rose",
  },
  {
    id: "cat-business",
    slug: "bisnis-manajemen",
    name: "Bisnis & Kepemimpinan",
    nameEn: "Business & Leadership",
    description: "Product management, agile project management, dan pertumbuhan startup.",
    iconName: "business",
    courseCount: 19,
    badgeColor: "amber",
  },
  {
    id: "cat-marketing",
    slug: "digital-marketing",
    name: "Pemasaran Digital",
    nameEn: "Digital Marketing",
    description: "Growth marketing, optimasi SEO technical, konten strategis, dan automasi.",
    iconName: "marketing",
    courseCount: 24,
    badgeColor: "emerald",
  },
  {
    id: "cat-cloud",
    slug: "cloud-devops",
    name: "DevOps & Keamanan Siber",
    nameEn: "DevOps & Cyber Security",
    description: "CI/CD pipelines, containerization Docker/K8s, dan kepatuhan sistem zero-trust.",
    iconName: "cloud",
    courseCount: 17,
    badgeColor: "sky",
  },
];

export const INSTRUCTORS: Record<string, Instructor> = {
  "inst-faisal": {
    id: "inst-faisal",
    name: "Rizky Faisal, M.Kom",
    role: "Lead Software Architect",
    company: "Elemes Tech Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    bio: "Praktisi arsitektur web modern dengan 12+ tahun pengalaman membangun sistem berkapasitas jutaan pengguna.",
    rating: 4.95,
    studentsCount: 18400,
    coursesCount: 6,
  },
  "inst-angel": {
    id: "inst-angel",
    name: "Angelina Santoso",
    role: "Principal Product Designer",
    company: "Studio Aksara UX",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
    bio: "Spesialis design tokens, human-centric interface, dan design system enterprise yang adaptif.",
    rating: 4.92,
    studentsCount: 14200,
    coursesCount: 5,
  },
  "inst-bryan": {
    id: "inst-bryan",
    name: "Dr. Bryan Wicaksono",
    role: "Head of Artificial Intelligence",
    company: "Nusantara AI Research",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    bio: "Peneliti machine learning dan arsitek model LLM generatif dengan publikasi ilmiah internasional.",
    rating: 4.88,
    studentsCount: 9750,
    coursesCount: 4,
  },
  "inst-sandra": {
    id: "inst-sandra",
    name: "Sandra Kusumawardhani",
    role: "Senior Engineering Manager & QA Lead",
    company: "Fintech Nusantara",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
    bio: "Pengajar sertifikasi QA automation, pengujian keamanan sistem finansial, dan audit mutu perangkat lunak.",
    rating: 4.97,
    studentsCount: 11300,
    coursesCount: 4,
  },
};

export const LMS_COURSES: Course[] = [
  {
    id: "elemes-next16-fullstack",
    slug: "nextjs-16-fullstack-enterprise",
    title: "Mastering Next.js 16 & React 19: Arsitektur Enterprise",
    subtitle: "Bangun aplikasi berskala produksi dengan Server Components, React Compiler, Tailwind v4, dan PWA Serwist.",
    description: "Kursus komprehensif ini dirancang bagi developer yang ingin menguasai ekosistem Next.js 16 App Router secara tuntas. Pelajari pola Server Actions, data fetching aman, enkripsi server-only, optimasi Largest Contentful Paint (LCP), hingga implementasi Progressive Web App.",
    categoryId: "cat-tech",
    level: "Menengah",
    levelEn: "Intermediate",
    rating: 4.94,
    reviewCount: 428,
    studentsCount: 4850,
    durationHours: 32,
    totalLessons: 48,
    price: 349000,
    originalPrice: 750000,
    isFree: false,
    isFeatured: true,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=480&fit=crop",
    instructor: INSTRUCTORS["inst-faisal"]!,
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PWA"],
    outcomes: [
      "Menguasai arsitektur Next.js 16 App Router dan Server Components",
      "Menerapkan keamanan enterprise dengan server-only encryption dan rate limiting",
      "Mendesain UI performa tinggi dengan Tailwind CSS v4 tanpa ketergantungan plugin lama",
      "Membangun PWA offline-first dengan Serwist service worker modern",
      "Deploy otomatis ke Vercel atau Container Docker dengan CI/CD terstandar",
    ],
    requirements: [
      "Pemahaman dasar HTML, CSS, dan JavaScript ES6+",
      "Pengalaman awal dengan React fundamental",
      "Komputer dengan Node.js/Bun terpasang",
    ],
    lastUpdated: "Oktober 2026",
    language: "Bahasa Indonesia (Subtitle EN)",
    reviews: [
      {
        id: "rev-1",
        authorName: "Dimas Prasetyo",
        authorRole: "Senior Frontend Engineer di Unicorn ID",
        rating: 5,
        date: "14 Oktober 2026",
        comment: "Materi Next.js 16 terlengkap di Indonesia. Pola Server Actions dan optimasi Tailwind v4 sangat relevan dengan kebutuhan proyek di kantor saya.",
      },
      {
        id: "rev-2",
        authorName: "Maya Putri",
        authorRole: "Tech Lead",
        rating: 5,
        date: "02 Oktober 2026",
        comment: "Penjelasannya runut, kodenya bersih dan mengikuti kaidah TypeScript strict. Sangat disarankan bagi tim engineer yang sedang migrasi ke React 19.",
      },
    ],
    modules: [
      {
        id: "mod-1",
        title: "Modul 1: Fondasi Next.js 16 & Server Components",
        description: "Pengenalan mental model App Router baru, Server vs Client boundary, dan compiler React 19.",
        lessons: [
          {
            id: "les-1-1",
            title: "Pengenalan Paradigma Baru Next.js 16 & React 19",
            duration: "14:20",
            durationMinutes: 14,
            isPreview: true,
            summary: "Memahami evolusi App Router, pemisahan bundel server/klien, dan efisiensi memori runtime.",
            notesMarkdown: "Next.js 16 membawa perbaikan drastis pada build pipeline dan integrasi penuh dengan React 19 Actions.",
            resources: [
              { id: "res-1", title: "Slide Pengantar Next 16.pdf", type: "PDF", size: "2.4 MB", url: "#" },
            ],
            quiz: {
              id: "qz-1-1",
              question: "Komponen manakah yang dijadikan default di Next.js App Router?",
              options: [
                "Client Components ('use client')",
                "React Server Components (RSC)",
                "Static HTML tanpa React",
                "Pure Web Components",
              ],
              correctIndex: 1,
              explanation: "Next.js App Router mengasumsikan setiap komponen sebagai React Server Component secara default kecuali ditandai 'use client'.",
            },
          },
          {
            id: "les-1-2",
            title: "Struktur Folder Skalabel & Konvensi Flat Routing",
            duration: "18:45",
            durationMinutes: 19,
            isPreview: true,
            summary: "Mengapa flat routing dengan searchParams lebih tahan uji dibandingkan nested dynamic folders yang terlalu dalam.",
            notesMarkdown: "Gunakan searchParams untuk mengalirkan state ringan dan menjaga arsitektur rute tetap rata.",
          },
          {
            id: "les-1-3",
            title: "Setup Styling Tailwind CSS v4 & Theming Tokens",
            duration: "21:10",
            durationMinutes: 21,
            isPreview: false,
            summary: "Migrasi ke engine CSS-first Tailwind v4 dengan direktif @theme inline dan class-based dark mode.",
          },
        ],
      },
      {
        id: "mod-2",
        title: "Modul 2: Keamanan Data & Server Actions",
        description: "Enkripsi AES-256-GCM, penyamaran ID Sqids, validasi Zod, dan rate limiting.",
        lessons: [
          {
            id: "les-2-1",
            title: "Implementasi Server Actions yang Kebal Injeksi",
            duration: "22:15",
            durationMinutes: 22,
            isPreview: false,
            summary: "Teknik otentikasi sesi dan validasi skema input dengan Zod pada server action.",
          },
          {
            id: "les-2-2",
            title: "Enkripsi Kriptografis Data Sensitif di Server-Only",
            duration: "25:30",
            durationMinutes: 26,
            isPreview: false,
            summary: "Melindungi data kredensial dan PII pengguna menggunakan AES-256-GCM.",
          },
        ],
      },
      {
        id: "mod-3",
        title: "Modul 3: PWA Offline & Optimasi Web Performance",
        description: "Serwist service worker, Core Web Vitals (LCP, INP, CLS), dan SEO metadata.",
        lessons: [
          {
            id: "les-3-1",
            title: "Integrasi Serwist PWA & Service Worker Caching",
            duration: "19:40",
            durationMinutes: 20,
            isPreview: false,
            summary: "Strategi cache StaleWhileRevalidate untuk aset statis dan NetworkFirst untuk rute dinamis.",
          },
          {
            id: "les-3-2",
            title: "Audit Kecepatan & Aksesibilitas WCAG 2.1 AA",
            duration: "24:10",
            durationMinutes: 24,
            isPreview: false,
            summary: "Mencapai skor Lighthouse 100 dengan optimalisasi font loading, gambar Next.js, dan kontras warna.",
          },
        ],
      },
    ],
  },
  {
    id: "elemes-uiux-system",
    slug: "design-system-modern-figma-code",
    title: "Design System Modern: Dari Figma ke Tailwind CSS v4",
    subtitle: "Rancang token desain konsisten, komponen 8-state, dan pengalaman pengguna mobile-first standar dunia.",
    description: "Pelajari bagaimana perusahaan teknologi papan atas menyelaraskan desainer dan engineer melalui design token yang kohesif. Kuasai pembuatan komponen reusable, standar aksesibilitas WCAG, micro-interaction yang bermakna, dan dokumentasi design system interaktif.",
    categoryId: "cat-design",
    level: "Pemula",
    levelEn: "Beginner",
    rating: 4.96,
    reviewCount: 312,
    studentsCount: 3620,
    durationHours: 26,
    totalLessons: 38,
    price: 299000,
    originalPrice: 600000,
    isFree: false,
    isFeatured: true,
    isTrending: false,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=480&fit=crop",
    instructor: INSTRUCTORS["inst-angel"]!,
    tags: ["UI/UX", "Design Systems", "Figma", "Tailwind v4", "Accessibility"],
    outcomes: [
      "Membangun hierarki visual yang kuat tanpa jebakan generic AI slop",
      "Menyusun token warna semantic (primary, neutral, surface, feedback)",
      "Mendesain komponen interaktif dengan 8 status (default, hover, active, focus, disabled, loading, empty, error)",
      "Menerjemahkan spesifikasi Figma secara presisi ke dalam Tailwind CSS v4",
    ],
    requirements: [
      "Tidak memerlukan kemampuan coding lanjutan",
      "Koneksi internet dan akun Figma gratis",
    ],
    lastUpdated: "September 2026",
    language: "Bahasa Indonesia",
    reviews: [
      {
        id: "rev-201",
        authorName: "Anindya Farah",
        authorRole: "UI Designer",
        rating: 5,
        date: "28 September 2026",
        comment: "Kaidah anti-slop yang diajarkan sangat membuka mata! Desain antarmuka saya kini terasa jauh lebih berkarakter dan fungsional.",
      },
    ],
    modules: [
      {
        id: "mod-ds-1",
        title: "Modul 1: Prinsip Token Desain & Tipografi",
        description: "Menetapkan skala tipografi, rasio modular, dan skema warna semantik.",
        lessons: [
          {
            id: "les-ds-1",
            title: "Pengantar Design Tokens & Semantic Variables",
            duration: "16:10",
            durationMinutes: 16,
            isPreview: true,
            summary: "Mengapa nama warna semantik lebih awet dibandingkan nama warna mentah.",
          },
          {
            id: "les-ds-2",
            title: "Mengatur Skala Kontras & Touch Target Standar Mobile",
            duration: "20:30",
            durationMinutes: 21,
            isPreview: false,
            summary: "Standar 44x44px minimum tap target dan kontras teks 4.5:1 untuk keterbacaan sempurna.",
          },
        ],
      },
    ],
  },
  {
    id: "elemes-ai-agentic",
    slug: "rekayasa-agentic-ai-llm-aplikasi",
    title: "Membangun Aplikasi Autonomous Agent & LLM Multi-Modal",
    subtitle: "Integrasi Gemini 2.5/3 Flash, Function Calling, RAG Berbasis Vektor, dan Orchestration Agent.",
    description: "Kuasai teknik membangun sistem AI cerdas yang mampu mengeksekusi aksi otonom, mencari data dokumen internal secara real-time, dan berkomunikasi natural dengan pengguna. Disertai studi kasus otomasi analisa data dan chatbot layanan pelanggan.",
    categoryId: "cat-ai",
    level: "Mahir",
    levelEn: "Advanced",
    rating: 4.91,
    reviewCount: 198,
    studentsCount: 2410,
    durationHours: 35,
    totalLessons: 42,
    price: 449000,
    originalPrice: 890000,
    isFree: false,
    isFeatured: true,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=480&fit=crop",
    instructor: INSTRUCTORS["inst-bryan"]!,
    tags: ["Artificial Intelligence", "Gemini API", "Python", "RAG", "Agents"],
    outcomes: [
      "Merancang workflow Multi-Agent dengan koordinasi pesan terstruktur",
      "Mengintegrasikan Gemini Flash untuk pemrosesan teks, audio, dan gambar berbiaya rendah",
      "Membangun pipeline Retrieval-Augmented Generation (RAG) dengan vector embeddings",
      "Mencegah halusinasi model dengan structured output and verification gates",
    ],
    requirements: [
      "Pengalaman pemrograman Python atau JavaScript/TypeScript",
      "Pengetahuan dasar tentang API web (HTTP/REST)",
    ],
    lastUpdated: "Oktober 2026",
    language: "Bahasa Indonesia",
    reviews: [],
    modules: [
      {
        id: "mod-ai-1",
        title: "Modul 1: Landasan Arsitektur Agentic AI",
        description: "Perbedaan chatbot konvensional dengan sistem agent otonom.",
        lessons: [
          {
            id: "les-ai-1",
            title: "Anatomi AI Agent: Perencana, Memori, dan Alat (Tools)",
            duration: "18:50",
            durationMinutes: 19,
            isPreview: true,
            summary: "Bagaimana LLM memanfaatkan Function Calling untuk berinteraksi dengan API eksternal.",
          },
        ],
      },
    ],
  },
  {
    id: "elemes-qa-security",
    slug: "automation-testing-security-audit",
    title: "Software QA Automation & Security Audit Terpadu",
    subtitle: "Unit Testing Vitest, E2E Testing Playwright, Penetrasi API, dan Quality Gate CI/CD.",
    description: "Tingkatkan reliabilitas produk perangkat lunak hingga 99.9%. Pelajari perancangan test harness dari nol, simulasi beban traffic ekstrem (stress profiling), audit keamanan OWASP Top 10, dan integrasi automated check ke pipeline GitHub Actions.",
    categoryId: "cat-tech",
    level: "Menengah",
    levelEn: "Intermediate",
    rating: 4.89,
    reviewCount: 145,
    studentsCount: 1890,
    durationHours: 28,
    totalLessons: 36,
    price: 0,
    originalPrice: 450000,
    isFree: true,
    isFeatured: false,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=480&fit=crop",
    instructor: INSTRUCTORS["inst-sandra"]!,
    tags: ["QA Automation", "Vitest", "Playwright", "Cybersecurity", "CI/CD"],
    outcomes: [
      "Membangun suite pengujian otomatis dengan eksekusi secepat kilat menggunakan Vitest",
      "Menyusun skenario end-to-end testing untuk alur registrasi, checkout, dan otentikasi",
      "Mendeteksi kerentanan celah injeksi dan rate limiting bypass sebelum rilis ke publik",
      "Menerapkan Quality Gate otomatis untuk mencegah regression bug",
    ],
    requirements: [
      "Dasar pemrograman web frontend atau backend",
    ],
    lastUpdated: "September 2026",
    language: "Bahasa Indonesia",
    reviews: [],
    modules: [
      {
        id: "mod-qa-1",
        title: "Modul 1: Strategi Piramida Pengujian Perangkat Lunak",
        description: "Menyeimbangkan Unit Test, Integration Test, dan E2E Test secara proporsional.",
        lessons: [
          {
            id: "les-qa-1",
            title: "Pengantar Filosofi Test-Driven Development (TDD)",
            duration: "15:20",
            durationMinutes: 15,
            isPreview: true,
            summary: "Siklus Red-Green-Refactor untuk menghasilkan kode yang bersih dan minim bug.",
          },
        ],
      },
    ],
  },
  {
    id: "elemes-pm-bootcamp",
    slug: "product-management-agile-delivery",
    title: "Product Management: Dari Riset Pasar hingga Peluncuran",
    subtitle: "Kuasai penulisan PRD tajam, perumusan Acceptance Criteria, metrik produk, dan alignment tim lintas divisi.",
    description: "Jembatani visi bisnis dengan eksekusi teknis engineering. Kursus ini membimbing Anda memvalidasi ide produk, menyusun roadmap fitur berbasis prioritas RICE, serta memimpin rapat alignment lintas tim desain, teknis, dan bisnis secara efektif.",
    categoryId: "cat-business",
    level: "Pemula",
    levelEn: "Beginner",
    rating: 4.93,
    reviewCount: 220,
    studentsCount: 2750,
    durationHours: 22,
    totalLessons: 30,
    price: 279000,
    originalPrice: 550000,
    isFree: false,
    isFeatured: false,
    isTrending: false,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=480&fit=crop",
    instructor: INSTRUCTORS["inst-faisal"]!,
    tags: ["Product Management", "Agile", "Scrum", "PRD", "Business"],
    outcomes: [
      "Mampu menuliskan PRD (Product Requirement Document) yang jelas dan zero-ambiguity",
      "Menguasai metodologi prioritisasi fitur (RICE & MoSCoW Framework)",
      "Menganalisis retensi dan metrik adopsi produk dengan analitik data kuantitatif",
      "Memimpin siklus sprint delivery bersama tim pengembang dan desainer",
    ],
    requirements: [
      "Terbuka untuk semua latar belakang profesional",
    ],
    lastUpdated: "Agustus 2026",
    language: "Bahasa Indonesia",
    reviews: [],
    modules: [
      {
        id: "mod-pm-1",
        title: "Modul 1: Discovery & Problem Framing",
        description: "Memvalidasi masalah nyata pengguna sebelum menulis baris kode pertama.",
        lessons: [
          {
            id: "les-pm-1",
            title: "Wawancara Pengguna & Pemetaan Empathy Map",
            duration: "17:15",
            durationMinutes: 17,
            isPreview: true,
            summary: "Teknik mengajukan pertanyaan tanpa mengarahkan jawaban (The Mom Test).",
          },
        ],
      },
    ],
  },
  {
    id: "elemes-cloud-k8s",
    slug: "cloud-native-devops-kubernetes-ci-cd",
    title: "Cloud-Native DevOps: Docker, Kubernetes & Zero-Trust Infra",
    subtitle: "Otomasi deployment aplikasi dengan containerization, monitoring Prometheus, dan serverless cloud.",
    description: "Pelajari cara mengoperasikan infrastruktur cloud yang tangguh, hemat biaya, dan siap menahan lonjakan jutaan akses mendadak. Dilengkapi laboratorium praktis setup cluster K8s, manajemen sertifikat SSL otomatis, dan perlindungan DDoS.",
    categoryId: "cat-cloud",
    level: "Mahir",
    levelEn: "Advanced",
    rating: 4.95,
    reviewCount: 167,
    studentsCount: 2100,
    durationHours: 34,
    totalLessons: 44,
    price: 389000,
    originalPrice: 799000,
    isFree: false,
    isFeatured: false,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=480&fit=crop",
    instructor: INSTRUCTORS["inst-bryan"]!,
    tags: ["DevOps", "Kubernetes", "Docker", "Cloud", "Linux"],
    outcomes: [
      "Menyusun Dockerfile multi-stage berukuran minimalis dan aman",
      "Mengonfigurasi deployment, ingress, dan auto-scaler di cluster Kubernetes",
      "Membangun pipeline CI/CD zero-downtime deployment",
      "Memonitor kestabilan server dengan Grafana dan log tracing terpusat",
    ],
    requirements: [
      "Pemahaman dasar perintah Linux terminal & jaringan komputer",
    ],
    lastUpdated: "Oktober 2026",
    language: "Bahasa Indonesia",
    reviews: [],
    modules: [
      {
        id: "mod-k8s-1",
        title: "Modul 1: Fondasi Containerization Modern",
        description: "Mengapa container mengubah lanskap pengiriman perangkat lunak modern.",
        lessons: [
          {
            id: "les-k8s-1",
            title: "Optimalisasi Docker Build Cache & Security Scanning",
            duration: "20:05",
            durationMinutes: 20,
            isPreview: true,
            summary: "Memangkas waktu build image dari 10 menit menjadi 30 detik.",
          },
        ],
      },
    ],
  },
];

export const LMS_PRESETS: LMSPreset[] = [
  {
    id: "campus",
    title: "Institusi Pendidikan & Kampus",
    subtitle: "Universitas, Institut, & Sekolah Tinggi",
    badge: "Akademik",
    description: "LMS lengkap dengan manajemen semester, SKS/kredit, silabus bertahap, grading tugas esai, serta integrasi presensi online mahasiswa.",
    keyFeatures: [
      "Struktur Semester, Modul, dan Ujian Akhir Terjadwal",
      "Pengunggahan Tugas & Rubrik Penilaian Dosen Terperinci",
      "Penerbitan Transkrip & Sertifikat Terakreditasi",
      "Forum Diskusi Terbimbing per Kelas",
    ],
    targetUsers: "Mahasiswa, Dosen, Tata Usaha, Rektorat",
  },
  {
    id: "bootcamp",
    title: "Bootcamp & Kursus Mandiri",
    subtitle: "Akselerator Karir Digital & Tech Academy",
    badge: "Intensif",
    description: "Dirancang untuk konversi karir cepat dengan alur belajar berbasis proyek nyata (project-based), portofolio, dan live code review.",
    keyFeatures: [
      "Jalur Karir (Career Track) dari Dasar ke Siap Kerja",
      "Pembelajaran Interaktif dengan Kode & Kuis Cepat",
      "Tracking Portofolio & Repositori GitHub Siswa",
      "Dukungan Pembayaran Bertahap & Akses Seumur Hidup",
    ],
    targetUsers: "Career Switchers, Junior Developers, Job Seekers",
  },
  {
    id: "corporate",
    title: "Pelatihan Perusahaan (Corporate)",
    subtitle: "Enterprise Talent Development & Upskilling",
    badge: "Korporat",
    description: "Otomasi pelatihan karyawan, orientasi onboarding divisi baru, sertifikasi kepatuhan (compliance), dan laporan analitik kemajuan tim.",
    keyFeatures: [
      "Dasbor Manajemen Tim untuk HRD & Manajer Divisi",
      "Sertifikasi Kepatuhan Standar Industri & Audit Log",
      "Jalur Pembelajaran Wajib per Posisi Jabatan",
      "Single Sign-On (SSO) & Perlindungan Konten Terenkripsi",
    ],
    targetUsers: "Karyawan, HRD Manager, Tim Pelatihan Korporat",
  },
  {
    id: "creator",
    title: "Course Creator & Komunitas",
    subtitle: "Monetisasi Konten Pengajar Independen",
    badge: "Independen",
    description: "Template ringkas dan elegan bagi kreator konten atau pakar industri yang ingin menjual kursus video eksklusif langsung ke audiens.",
    keyFeatures: [
      "Halaman Penjualan (Landing Page) Kursus Berkonversi Tinggi",
      "Player Video Fokus Tanpa Distraksi dengan Watermark",
      "Koleksi Berkas Lampiran Materi & E-Book Unduhan",
      "Integrasi Komunitas Eksklusif & Tanya-Jawab Instruktur",
    ],
    targetUsers: "Instruktur Mandiri, Mentor Karir, Podcaster, Kreator Edukasi",
  },
];

export const MOCK_STUDENT_DASHBOARD: StudentDashboard = {
  name: "Budi Santoso",
  email: "budi.santoso@alumni.ac.id",
  role: "Mahasiswa Rekayasa Perangkat Lunak",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces",
  streakDays: 14,
  totalHoursLearned: 48,
  certificatesEarned: 3,
  averageQuizScore: 94,
  enrolledCourses: [
    {
      courseId: "elemes-next16-fullstack",
      progressPercent: 42,
      currentLessonId: "les-1-3",
      lastAccessed: "Hari ini, 09:30 WIB",
    },
    {
      courseId: "elemes-uiux-system",
      progressPercent: 85,
      currentLessonId: "les-ds-2",
      lastAccessed: "Kemarin, 20:15 WIB",
    },
    {
      courseId: "elemes-qa-security",
      progressPercent: 100,
      currentLessonId: "les-qa-1",
      lastAccessed: "16 Okt 2026",
    },
  ],
  upcomingDeadlines: [
    {
      id: "dl-1",
      title: "Kuis Modul 1: Server Components Mental Model",
      courseId: "elemes-next16-fullstack",
      lessonId: "les-1-1",
      courseTitle: "Mastering Next.js 16 & React 19",
      dueDate: "Besok, 23:59 WIB",
      type: "Kuis",
    },
    {
      id: "dl-2",
      title: "Proyek Mini: Redesign Token Desain Mobile",
      courseId: "elemes-uiux-system",
      lessonId: "les-ds-1",
      courseTitle: "Design System Modern: Dari Figma ke Tailwind",
      dueDate: "26 Okt 2026",
      type: "Proyek Akhir",
    },
  ],
  certificates: [
    {
      id: "cert-001",
      courseId: "elemes-qa-security",
      courseTitle: "Software QA Automation & Security Audit Terpadu",
      issuedDate: "16 Okt 2026",
      credentialId: "ELM-2026-QA-88392",
      grade: "Kelulusan Istimewa (A+)",
    },
  ],
};
