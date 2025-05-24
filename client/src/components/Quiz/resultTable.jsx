export default function ResultTable() {
    return (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Attempts</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Earn Points</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Result</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-gray-200 hover:bg-gray-100 transition">
              <td className="py-3 px-4">Vishisht</td>
              <td className="py-3 px-4">03</td>
              <td className="py-3 px-4">30</td>
              <td className="py-3 px-4 text-green-600 font-semibold">Passed</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  