import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Edit, Trash, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/guide/Sidebar"; // Sidebar import
import { useAuth } from '../../context/AuthContext';
import { usePackage } from '../../context/PackageContext'; // Import the context
import { format, isBefore, startOfDay } from 'date-fns';

const MyPackagesPage = () => {
  const { user } = useAuth(); // Get current user
  const navigate = useNavigate();
  
  // Use the context hook to access packages and actions
  const { packages, loading, error, addPackage, updatePackage, deletePackage } = usePackage(); 

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
    console.log("Useffect packages: ",packages);
 
    if (!loading ) {
      console.log("Packages loaded:", packages);
    }
    else
    {
      console.log("LoADINGGGGGGGGGGGGGGGGG");
    }
  }, [loading, error, packages]);

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
    console.log("Adding package");
    const newPkg = {
      ...newPackage,
      id: user._id, // Assuming package ids are incremental
      availableDates: newPackage.availableDates.split(','),
    };

    console.log("New pacakge: ",newPkg);
    addPackage(newPkg); // Call addPackage function from context
    // setNewPackage({
    //   title: '',
    //   description: '',
    //   price: '',
    //   availableDates: '',
    //   includedServices: [],
    //   dateField: '',
    // });
    setShowAddForm(false); // Hide form after adding package
    
  };

  // Handle editing a package
  const handleEditPackage = (id) => {
    console.log("Editing package with id: ",id);
    const pkg = packages.find((pkg) => pkg._id === id);
    setNewPackage({
      ...pkg,
      availableDates: pkg.availableDates.join(','),
      includedServices: pkg.includedServices,
    });
    navigate(`/edit-package/${id}`);
  };

  // Handle deleting a package
  const handleDeletePackage = (id) => {
    console.log("delete found: ",id);

    deletePackage(id); // Call deletePackage function from context
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
    console.log("sersvive found: ",service)
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

                {/* Display selected services */}
                <div className="mt-4">
                  {newPackage.includedServices.map((service) => (
                    <div key={service} className="inline-flex items-center gap-2 mb-2">
                      <span className="text-sm">{service}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service)}
                        className="text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition duration-300"
              >
                Add Package
              </button>
            </form>
          </motion.div>
        ) : null}

        {/* Package List */}
        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading packages...</div>
        ) //: error ? (
         // <div className="text-center text-lg text-red-600">Error loading packages.</div>
       // ) 
        : (
          <div>
            {packages.length === 0 ? (
              <div>No packages available.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="bg-white p-4 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-blue-800">{pkg.title}</h4>
                    <p className="text-sm text-gray-700">{pkg.description}</p>
                    <div className="mt-2">
                      <strong>Price:</strong> ${pkg.price}
                    </div>
                    <div className="mt-2">
                      <strong>Available Dates:</strong> {pkg.availableDates.join(', ')}
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleEditPackage(pkg._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPackagesPage;
