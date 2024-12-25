'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileHeader from '../../components/guide/Profile/ProfileHeader'
import ProfileForm from '../../components/guide/Profile/ProfileForm'
import Sidebar from '../../components/guide/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { useGuide } from '../../context/GuideContext'
import { staggerContainer, fadeInUp } from '../../components/guide/Dashboard/animations';

const GuideProfile = () => {
  console.log("In guide Profile on the");
  const { user } = useAuth()
  const { guideData, updateGuideData, loading, error } = useGuide()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (updatedData) => {
    setIsSaving(true)
    try {
      await updateGuideData(updatedData)
      // Show success notification here
    } catch (error) {
      // Show error notification here
      console.error('Failed to update profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error loading profile: {error}</div>
        </div>
      </div>
    )
  }

  const combinedData = {
    ...user,
    ...guideData,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.div 
        className="flex-1 p-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <ProfileHeader />
        </motion.div>
  
        <div className="flex-1">
        
          <motion.main
            className="max-w-5xl mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <ProfileForm
                    key="profile-form"
                    userData={combinedData}
                    onSave={handleSave}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.main>
        </div>
      </motion.div>
    </div>
  )
}
  
export default GuideProfile

