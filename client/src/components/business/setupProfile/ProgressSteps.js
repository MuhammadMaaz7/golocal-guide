import { Check, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-start">
            <div className="flex items-center">
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                    ${isActive ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'}`}
                >
                  <Circle className="w-5 h-5" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div
                  className={`h-12 w-0.5 ml-4 -mb-8
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              )}
            </div>
            <div className="ml-4">
              <p
                className={`text-sm font-medium
                  ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
              >
                Step {step.id}
              </p>
              <p
                className={`text-sm
                  ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
              >
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

