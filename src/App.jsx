import { useData } from './hooks/useData';
import LeadsList from './components/leads/LeadsList';
import OpportunitiesTable from './components/opportunities/OpportunitiesTable';

function App() {
  const { state } = useData();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Mini Seller Console</h1>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {state.loading && <div className="text-center py-12">Loading...</div>}
          {state.error && <div className="text-red-500 text-center py-12">Error: {state.error}</div>}
          {!state.loading && !state.error && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Leads</h2>
                <LeadsList />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Opportunities</h2>
                <OpportunitiesTable />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
