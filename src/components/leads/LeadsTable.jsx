const LeadsTable = ({ leads, onRowClick }) => {
  if (leads.length === 0) {
    return <p>No leads found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} onClick={() => onRowClick(lead)} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.company}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
