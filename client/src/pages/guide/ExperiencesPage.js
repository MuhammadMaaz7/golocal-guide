import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '../../context/ExperienceContext';
import AddExperienceForm from '../../components/guide/Experiences/AddExperienceForm.js';
import ExperienceCard from '../../components/guide/Experiences/ExperienceCard';
import Sidebar from '../../components/guide/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle } from 'lucide-react';

const ExperiencePage = () => {
  const { experiences, loading, error, fetchExperiences, addExperience } = useExperience();
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
  }, [fetchExperiences]);

  const handleAddExperienceClick = () => {
    setShowAddForm(true);
  };

  const handleAddExperience = (newExperience) => {
    newExperience.guideID = user._id;
    addExperience(newExperience);
    setShowAddForm(false);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Experience Management</h1>
        <AnimatePresence mode="wait">
          {!showAddForm ? (
            <motion.div
              key="experience-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">My Experiences</h2>
                <button
                  onClick={handleAddExperienceClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
                >
                  <PlusCircle className="mr-2" size={20} />
                  Add Experience
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((experience) => (
                  <ExperienceCard key={experience._id} experience={experience} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="add-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AddExperienceForm
                addExperience={handleAddExperience}
                onCancel={() => setShowAddForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperiencePage;