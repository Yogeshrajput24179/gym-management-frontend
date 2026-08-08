"use client";

const payments = [
  {
    id: 1,
    member: "Rahul Sharma",
    amount: "₹3,000",
    date: "17 Jul 2026",
    status: "Paid",
  },
  {
    id: 2,
    member: "Priya Singh",
    amount: "₹2,500",
    date: "16 Jul 2026",
    status: "Paid",
  },
  {
    id: 3,
    member: "Aman Verma",
    amount: "₹1,500",
    date: "15 Jul 2026",
    status: "Pending",
  },
];

export default function RecentPayments() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Payments
        </h2>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left text-gray-500">
            <th className="pb-3">Member</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b last:border-none">
              <td className="py-4 font-medium">{payment.member}</td>

              <td>{payment.amount}</td>

              <td>{payment.date}</td>

              <td>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    payment.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}