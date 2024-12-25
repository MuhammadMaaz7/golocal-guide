import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import BusinessDetails from '../../components/business/setupProfile/BusinessDetails';
import ContactInformation from '../../components/business/setupProfile/ContactInformation';
import LocationDetails from '../../components/business/setupProfile/LocationDetails';
import Policies from '../../components/business/setupProfile/Policies';
import PaymentMethods from '../../components/business/setupProfile/PaymentMethods';
import SocialMedia from '../../components/business/setupProfile/SocialMedia';
import MediaUpload from '../../components/business/setupProfile/MediaUpload';
import ProgressSteps from '../../components/business/setupProfile/ProgressSteps';

export default function SetupProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Business Details', component: BusinessDetails },
    { id: 2, title: 'Contact Information', component: ContactInformation },
    { id: 3, title: 'Location', component: LocationDetails },
    { id: 4, title: 'Policies', component: Policies },
    { id: 5, title: 'Payment Methods', component: PaymentMethods },
    { id: 6, title: 'Social Media', component: SocialMedia },
    { id: 7, title: 'Media Upload', component: MediaUpload },
  ];

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      console.log("Current Step",currentStep);
    } else {
      // All steps are completed
      try {
        // Redirect to login page        
      console.log("Redirect to login page",currentStep);
        navigate('/login');
      } catch (error) {
        console.error('Error updating user profile:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="text-right">
            <span className="text-sm text-gray-500">Need help?</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Progress Steps */}
            <div className="md:col-span-3">
              <ProgressSteps steps={steps} currentStep={currentStep} />
            </div>

            {/* Form Content */}
            <div className="md:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CurrentStepComponent onNext={handleNext} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

