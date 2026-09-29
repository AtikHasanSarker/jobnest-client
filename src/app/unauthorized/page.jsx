import Link from "next/link";

import Shield from "@gravity-ui/icons/Shield";
import ArrowLeft from "@gravity-ui/icons/ArrowLeft";
import House from "@gravity-ui/icons/House";

const UnauthorizedPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

        <div className="absolute bottom-[-180px] left-[-150px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="absolute right-[-150px] top-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="mt-30 relative z-10 w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex size-24 items-center justify-center rounded-3xl border border-purple-400/20 bg-purple-500/10 shadow-2xl shadow-purple-950/30 backdrop-blur-xl">
          <Shield className="size-11 text-purple-400" />
        </div>

        {/* Error Code */}
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
          Error 403
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Access{" "}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Denied
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          You don&apos;t have permission to access this page. Please make sure you&apos;re
          using an account with the required permissions.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200"
          >
            <House className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/jobs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
          >
            Browse Jobs
            <ArrowLeft className="size-4 rotate-180" />
          </Link>
        </div>

        {/* Small Brand Message */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <p className="text-xs text-gray-600">
            JobNest · Find your next opportunity
          </p>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
