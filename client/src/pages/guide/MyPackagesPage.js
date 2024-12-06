import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Edit, Trash, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/guide/Sidebar"; // Sidebar import
import { useAuth } from '../../context/AuthContext';
import { format, isBefore, startOfDay } from 'date-fns';

const MyPackagesPage = () => {
  const { user } = useAuth(); // Get current user
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    includedServices: [],
    dateField: '', // Date field for the package
  });
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle form visibility
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceOptions, setServiceOptions] = useState([
    'Meals', 'Transport', 'Guide', 'Snacks', 'Wifi', 'Parking', 'Photography'
  ]); // Demo services list
  const [availableServices, setAvailableServices] = useState(serviceOptions); // Filtered services based on search term

  useEffect(() => {
    // Mock fetching data; replace with actual API call to fetch user's packages
    const fetchedPackages = [
      {
        id: 1,
        title: 'Mountain Adventure',
        description: 'Explore the beautiful mountains.',
        price: 250,
        availableDates: ['2024-12-01', '2024-12-02'],
        includedServices: ['Meals', 'Transport'],
      },
      {
        id: 2,
        title: 'City Tour',
        description: 'A guided tour through the city.',
        price: 120,
        availableDates: ['2024-12-10', '2024-12-12'],
        includedServices: ['Transport', 'Guide'],
      },
    ];
    setPackages(fetchedPackages);
    setIsLoading(false);
  }, []);

  // Handle input change for adding new package
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new package
  const handleAddPackage = (e) => {
    e.preventDefault();
    const newPkg = {
      ...newPackage,
      id: packages.length + 1, // Assuming package ids are incremental
      availableDates: newPackage.availableDates.split(','),
    };
    setPackages((prevPackages) => [...prevPackages, newPkg]);
    setNewPackage({
      title: '',
      description: '',
      price: '',
      availableDates: '',
      includedServices: [],
      dateField: '',
    });
    setShowAddForm(false); // Hide form after adding package
  };

  // Handle editing a package
  const handleEditPackage = (id) => {
    const pkg = packages.find((pkg) => pkg.id === id);
    setNewPackage({
      ...pkg,
      availableDates: pkg.availableDates.join(','),
      includedServices: pkg.includedServices,
    });
    navigate(`/edit-package/${id}`);
  };

  // Handle deleting a package
  const handleDeletePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  // Handle adding/removing services
  const handleAddService = (service) => {
    if (!newPackage.includedServices.includes(service)) {
      setNewPackage((prev) => ({
        ...prev,
        includedServices: [...prev.includedServices, service],
      }));
    }
    setSearchTerm('');
  };

  const handleRemoveService = (service) => {
    setNewPackage((prev) => ({
      ...prev,
      includedServices: prev.includedServices.filter((s) => s !== service),
    }));
  };

  // Handle search for services
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setAvailableServices(serviceOptions.filter(service => service.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  // Generate available date dropdown options (future and present dates only)
  const generateDateOptions = () => {
    const currentDate = new Date();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() + i);
    return { months, years };
  };

  const { months, years } = generateDateOptions();

  // Get today's date to set as the minimum date for the date field
  const today = new Date();
  const minDate = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">My Packages</h2>

        {/* Button to Add New Package */}
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-6 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Package
        </button>

        {/* Show Add Package Form if showAddForm is true */}
        {showAddForm ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Add New Package</h3>
            <form onSubmit={handleAddPackage}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm text-blue-600">Package Title</label>
                <input
                  type="text"
                  name="title"
                  value={newPackage.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm text-blue-600">Description</label>
                <textarea
                  name="description"
                  value={newPackage.description}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm text-blue-600">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newPackage.price}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm text-blue-600">Available Date</label>
                <input
                  type="date"
                  name="dateField"
                  value={newPackage.dateField}
                  onChange={handleInputChange}
                  min={minDate} // Only allow today and future dates
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Included Services */}
              <div className="mb-4">
                <label className="block text-sm text-blue-600">Included Services</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search services"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-2">
                  {availableServices.map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => handleAddService(service)}
                      className="text-sm bg-emerald-200 text-emerald-600 p-2 rounded-md mr-2 mb-2"
                    >
                      {service}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {newPackage.includedServices.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-1 bg-emerald-100 text-emerald-600 px-2 py-1 rounded-md"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-300"
              >
                Add Package
              </button>
            </form>
          </motion.div>
        ) : (
          // Display List of Packages
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white shadow-lg rounded-lg p-6 space-y-4"
                >
                  <h3 className="text-xl font-semibold text-blue-800">{pkg.title}</h3>
                  <p className="text-gray-700">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price: ${pkg.price}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditPackage(pkg.id)}
                        className="text-emerald-600 hover:text-emerald-800 transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Available Dates:</strong>
                    {pkg.availableDates.map((date, index) => (
                      <span key={index} className="block">{new Date(date).toLocaleDateString()}</span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Included Services:</strong>
                    <ul className="list-disc pl-5">
                      {pkg.includedServices.map((service, index) => (
                        <li key={index} className="text-gray-600">{service}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyPackagesPage;
