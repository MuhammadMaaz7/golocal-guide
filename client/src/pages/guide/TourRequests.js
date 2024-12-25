import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import GuideRequestList from '../../components/guide/TourRequests/TourRequestList';
import ChatBox from '../../components/guide/TourRequests/ChatBox';
import Sidebar from '../../components/guide/Sidebar';
import { useGuideRequests } from '../../context/RequestsContext';

const GuideRequests = () => {
  const { requests, stats, loading, error, fetchRequests } = useGuideRequests();
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: '',
    priceMin: '',
    priceMax: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    let result = [...requests];

    // Apply filters
    if (filters.status) {
      result = result.filter(request => request.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.dateFrom) {
      result = result.filter(request => new Date(request.startDate) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter(request => new Date(request.startDate) <= new Date(filters.dateTo));
    }
    if (filters.priceMin) {
      result = result.filter(request => request.price >= parseFloat(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(request => request.price <= parseFloat(filters.priceMax));
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    setFilteredRequests(result);
  }, [requests, filters, sortConfig]);

  const handleChatClick = (request) => {
    setSelectedRequest(request);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      dateFrom: '',
      dateTo: '',
      priceMin: '',
      priceMax: ''
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Guide Requests</h1>
              <p className="text-sm text-gray-500">Manage your incoming guide requests</p>
            </div>
            
            <motion.div
              initial={false}
              animate={{ width: filters.status || filters.dateFrom || filters.dateTo || filters.priceMin || filters.priceMax ? 'auto' : '120px' }}
              className="relative"
            >
              <button 
                onClick={() => document.getElementById('filterMenu').classList.toggle('hidden')}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </button>
              <div id="filterMenu" className="hidden absolute right-0 mt-2 p-4 bg-white border rounded-lg shadow-lg z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    >
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date From</label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date To</label>
                    <input
                      type="date"
                      name="dateTo"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Price</label>
                    <input
                      type="number"
                      name="priceMin"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Price</label>
                    <input
                      type="number"
                      name="priceMax"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Total Requests</div>
              <div className="text-2xl font-semibold text-emerald-600">{stats.total}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-2xl font-semibold text-yellow-600">{stats.pending}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Confirmed</div>
              <div className="text-2xl font-semibold text-emerald-600">{stats.confirmed}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Cancelled</div>
              <div className="text-2xl font-semibold text-red-600">{stats.cancelled}</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border">
            <GuideRequestList
              requests={filteredRequests}
              onChatClick={handleChatClick}
              onSort={handleSort}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <ChatBox
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuideRequests;

