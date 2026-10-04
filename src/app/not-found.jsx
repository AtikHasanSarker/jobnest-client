import Link from "next/link";

import {
  Magnifier,
  House,
  Briefcase,
  Factory,
  CreditCard,
} from "@gravity-ui/icons";

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ================= Background ================= */}

      {/* Purple glow - top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-130 bg-[radial-linear(ellipse_at_top,#8b006f_0%,#3d003c_38%,transparent_72%)]" />

      {/* Purple glow - right */}
      <div className="pointer-events-none absolute -right-40 top-40 h-125 w-125 rounded-full bg-fuchsia-600/20 blur-[150px]" />

      {/* Purple glow - left */}
      <div className="pointer-events-none absolute -left-40 top-80 h-[450px] w-[450px] rounded-full bg-purple-700/15 blur-[150px]" />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <span className="absolute left-[8%] top-[25%] size-1 rounded-full bg-white" />
        <span className="absolute left-[18%] top-[55%] size-1 rounded-full bg-blue-400" />
        <span className="absolute left-[27%] top-[34%] size-1 rounded-full bg-purple-300" />
        <span className="absolute left-[39%] top-[18%] size-1 rounded-full bg-white" />
        <span className="absolute left-[52%] top-[27%] size-1 rounded-full bg-fuchsia-400" />
        <span className="absolute left-[64%] top-[16%] size-1 rounded-full bg-white" />
        <span className="absolute left-[73%] top-[39%] size-1 rounded-full bg-purple-300" />
        <span className="absolute left-[82%] top-[23%] size-1 rounded-full bg-blue-300" />
        <span className="absolute left-[91%] top-[55%] size-1 rounded-full bg-white" />
        <span className="absolute left-[12%] top-[75%] size-1 rounded-full bg-fuchsia-300" />
        <span className="absolute left-[47%] top-[72%] size-1 rounded-full bg-white" />
        <span className="absolute left-[88%] top-[78%] size-1 rounded-full bg-purple-300" />
      </div>

      {/* ================= Content ================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        {/* ================= Navbar ================= */}

        <nav className="flex h-[78px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-7 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold tracking-tight">
            <span className="text-cyan-400">Job</span>
            <span className="text-orange-400">Nest</span>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            <Link
              href="/jobs"
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              Browse Jobs
            </Link>

            <Link
              href="/companies"
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              Companies
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              Pricing
            </Link>

            <div className="h-7 w-px bg-white/10" />

            <Link
              href="/profile"
              className="flex size-12 items-center justify-center rounded-full bg-white/10 text-sm font-semibold transition hover:bg-white/15"
            >
              U
            </Link>
          </div>

          {/* Mobile profile */}
          <Link
            href="/profile"
            className="flex size-11 items-center justify-center rounded-full bg-white/10 text-sm font-semibold md:hidden"
          >
            U
          </Link>
        </nav>

        {/* ================= Error Content ================= */}

        <section className="flex min-h-[calc(100vh-125px)] flex-col items-center justify-center pb-16 pt-16 text-center">
          {/* 404 Illustration */}

          <div className="relative mb-8 flex items-center justify-center">
            {/* Outer glow */}
            <div className="absolute size-52 rounded-full bg-purple-600/20 blur-[80px]" />

            {/* Orbit */}
            <div className="absolute h-28 w-[340px] rotate-[-12deg] rounded-[50%] border border-fuchsia-500/60 shadow-[0_0_25px_rgba(217,70,239,0.3)]" />

            {/* Planet */}
            <div
              className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-linear(circle_at_35%_25%,#ec4899,#7c3aed_45%,#172554_100%)] shadow-[0_0_60px_rgba(168,85,247,0.45)]"
            />

            {/* Planet highlight */}
            <div className="absolute left-[47%] top-[34%] size-3 rounded-full bg-white/50 blur-[2px]" />

            {/* 404 */}
            <div className="relative flex items-center gap-2 text-[145px] font-black leading-none tracking-[-0.08em] md:text-[190px]">
              <span
                className="bg-linear-to-b from-white via-purple-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]"
              >
                4
              </span>

              {/* Space for planet */}
              <span className="w-28 md:w-36" />

              <span
                className="bg-linear-to-b from-white via-purple-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]"
              >
                4
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Oops! Page not found
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            The page you&apos;re looking for doesn&apos;t exist.
            Let&apos;s get you back on track.
          </p>

          {/* ================= Main Actions ================= */}

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            {/* Home */}
            <Link
              href="/"
              className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold shadow-[0_0_30px_rgba(124,58,237,0.35)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
            >
              <House className="size-4" />
              Go to Home
            </Link>

            {/* Browse Jobs */}
            <Link
              href="/jobs"
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <Magnifier className="size-4" />
              Browse Jobs
            </Link>
          </div>

          {/* ================= Popular Pages ================= */}

          <div className="mt-14 w-full max-w-xl">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />

              <span className="shrink-0 text-sm text-slate-500">
                Or try these popular pages
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
              >
                <Briefcase className="size-4" />
                Browse Jobs
              </Link>

              <Link
                href="/companies"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
              >
                <Factory className="size-4" />
                Companies
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
              >
                <CreditCard className="size-4" />
                Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
