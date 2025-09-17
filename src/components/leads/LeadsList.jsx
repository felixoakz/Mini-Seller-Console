import { useState, useMemo, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import LeadsTable from './LeadsTable';
import LeadDetail from './LeadDetail';
import SlideOver from '../ui/SlideOver';

const LeadsList = () => {
  const { state } = useData();
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem('leads.searchTerm') || ''
  );
  const [statusFilter, setStatusFilter] = useState(
    () => localStorage.getItem('leads.statusFilter') || 'All'
  );
  const [sort, setSort] = useState('score_desc');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    localStorage.setItem('leads.searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('leads.statusFilter', statusFilter);
  }, [statusFilter]);

  const filteredLeads = useMemo(() => {
    let leads = [...state.leads];

    // Filter by status
    if (statusFilter !== 'All') {
      leads = leads.filter(lead => lead.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      leads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sort) {
      case 'score_desc':
        leads.sort((a, b) => b.score - a.score);
        break;
      case 'name_asc':
        leads.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return leads;
  }, [state.leads, searchTerm, statusFilter, sort]);

  const statusOptions = ['All', ...new Set(state.leads.map(l => l.status))];

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
  };

  const handleCloseDetail = () => {
    setSelectedLead(null);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or company..."
          className="border p-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Status Filter */}
          <select
            className="border p-2 rounded w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            className="border p-2 rounded w-full sm:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="score_desc">Score (High to Low)</option>
            <option value="name_asc">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <LeadsTable leads={filteredLeads} onRowClick={handleRowClick} />

      <SlideOver open={!!selectedLead} onClose={handleCloseDetail}>
        <LeadDetail lead={selectedLead} onClose={handleCloseDetail} />
      </SlideOver>
    </div>
  );
};

export default LeadsList;
