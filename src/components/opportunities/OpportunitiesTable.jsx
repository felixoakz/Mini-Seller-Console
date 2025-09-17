import { useData } from '../../hooks/useData';

const OpportunitiesTable = () => {
  const { state } = useData();

  if (state.opportunities.length === 0) {
    return (
      <div className="bg-white p-4 shadow rounded-lg text-center text-gray-500">
        <p>No opportunities yet. Convert a lead to see it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {state.opportunities.map((opp) => (
              <tr key={opp.id}>
                <td className="px-6 py-4 whitespace-nowrap">{opp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{opp.accountName}</td>
                <td className="px-6 py-4 whitespace-nowrap">${opp.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{opp.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunitiesTable;
