"use client";

const members = [
  {
    id: 1,
    name: "Rahul Sharma",
    plan: "Gold",
    joined: "15 Jul 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Singh",
    plan: "Silver",
    joined: "13 Jul 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Aman Verma",
    plan: "Basic",
    joined: "10 Jul 2026",
    status: "Pending",
  },
];

export default function RecentMembers() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Members
        </h2>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left text-gray-500">
            <th className="pb-3">Name</th>
            <th className="pb-3">Plan</th>
            <th className="pb-3">Joined</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b last:border-none">
              <td className="py-4 font-medium">{member.name}</td>

              <td>{member.plan}</td>

              <td>{member.joined}</td>

              <td>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    member.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {member.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}