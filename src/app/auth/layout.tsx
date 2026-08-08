export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-16 text-white">
        <h1 className="text-6xl font-extrabold">
          Gym AI
        </h1>

        <p className="mt-8 max-w-md text-xl leading-9 text-blue-100">
          Manage Members, Trainers, Attendance,
          Payments, Diet Plans and Reports from one
          powerful dashboard.
        </p>
      </div>

      <div className="flex items-center justify-center bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}