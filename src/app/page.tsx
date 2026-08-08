export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-3xl font-bold text-blue-500">
          GymAI
        </h1>

        <div className="space-x-4">
          <a
            href="/auth/login"
            className="rounded-lg border border-blue-500 px-5 py-2 hover:bg-blue-500"
          >
            Login
          </a>

          <a
            href="/auth/register"
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold md:text-7xl">
          Smart Gym Management
          <span className="text-blue-500"> with AI</span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-gray-300">
          Manage Members, Trainers, Attendance, Memberships,
          Payments and Reports from one powerful dashboard.
          Built with AI-powered insights to simplify gym
          operations.
        </p>

        <div className="mt-10 flex gap-5">
          <a
            href="/auth/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
          >
            Get Started
          </a>

          <a
            href="/auth/login"
            className="rounded-xl border border-white px-8 py-4 font-semibold hover:bg-white hover:text-black"
          >
            Login
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-xl font-bold">👥 Members</h3>
          <p className="mt-3 text-gray-400">
            Manage members, plans, renewals and membership
            history.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-xl font-bold">💳 Payments</h3>
          <p className="mt-3 text-gray-400">
            Track payments, invoices and pending dues.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h3 className="text-xl font-bold">🤖 AI Insights</h3>
          <p className="mt-3 text-gray-400">
            AI-powered reports, workout suggestions and gym
            analytics.
          </p>
        </div>
      </section>
    </main>
  );
}