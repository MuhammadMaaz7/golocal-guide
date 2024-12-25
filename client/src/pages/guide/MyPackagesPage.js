
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import PackageCard from '../../components/guide/Packages/PackageCard';
import AddPackageForm from '../../components/guide/Packages/AddPackageForm';
import Sidebar from '../../components/guide/Sidebar';
import { usePackage } from '../../context/PackageContext';

export default function MyPackagesPage() {
  const { packages, loading, error, addPackage, updatePackage, deletePackage } = usePackage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);

  const filteredPackages = packages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPackage = (packageData) => {
    addPackage(packageData);
    setShowAddForm(false);
  };

  const handleEditPackage = (packageData) => {
    updatePackage(packageData._id, packageData);
    setEditingPackage(null);
  };

  const handleDeletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(id);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-800">My Packages</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Package
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <AnimatePresence>
          {showAddForm && (
            <AddPackageForm
              onSubmit={handleAddPackage}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </AnimatePresence>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 border-r-2 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        ) : 
        // error ? (
        //   <div className="text-center py-10 text-red-500">
        //     Error loading packages. Please try again later.
        //   </div>
        // ) : 
        (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  {...pkg}
                  onEdit={() => setEditingPackage(pkg)}
                  onDelete={() => handleDeletePackage(pkg._id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {editingPackage && (
            <AddPackageForm
              initialData={editingPackage}
              onSubmit={handleEditPackage}
              onCancel={() => setEditingPackage(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

