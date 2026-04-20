import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step5 from './components/steps/Step5';
import Step6To9 from './components/steps/Step6To9';
import Step10 from './components/steps/Step10';
import Success from './components/Success';
import { getStepValidator } from './utils/validation';


const TOTAL_STEPS = 10;

export default function App() {
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',

    // Step 2: Emergency Contact
    emergencyContact: {
      name: '',
      phoneNumber: '',
    },

    // Step 3: Service Selection
    selectedService: '',

    // Step 4: Medical & Skin History
    medicalHistory: [],
    allergiesDetails: '',
    medicalHistoryOther: '',

    // Step 5: Dynamic Service Section
    lashData: {
      previousLashExtensions: null,
      lastFillDate: '',
      previousReactions: '',
      lashLiftBefore: null,
      browLaminationBefore: null,
      patchTestCompleted: null,
    },
    facialData: {
      skinType: '',
      concerns: [],
      skincareRoutine: '',
    },

    // Step 6: Pre-Service Acknowledgment
    understandIrritation: false,
    understandVariableResults: false,
    followedPreCareInstructions: false,

    // Step 7: Consent & Liability
    consentProcedure: false,
    confirmInformation: false,
    understandRisks: false,
    releaseFromLiability: false,

    // Step 8: Aftercare Agreement
    avoidHeat: false,
    avoidOil: false,
    avoidTouching: false,
    followAftercare: false,

    // Step 9: Photography Consent
    photographyConsent: null,

    // Step 10: Signature
    signatureName: '',
    signatureDate: '',
  });

  const isStepValid = () => {
    const validator = getStepValidator(currentStep);
    return validator(formData);
  };

  const handleNext = () => {
    if (isStepValid()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStepValid()) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/forms/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,

          emergencyContactName: formData.emergencyContact.name,
          emergencyContactPhone: formData.emergencyContact.phoneNumber,

          selectedService: formData.selectedService,

          medicalHistory: formData.medicalHistory,
          allergiesDetails: formData.allergiesDetails,
          medicalHistoryOther: formData.medicalHistoryOther,

          lashData: formData.lashData,
          facialData: formData.facialData,

          understandIrritation: formData.understandIrritation,
          understandVariableResults: formData.understandVariableResults,
          followedPreCareInstructions: formData.followedPreCareInstructions,

          consentProcedure: formData.consentProcedure,
          confirmInformation: formData.confirmInformation,
          understandRisks: formData.understandRisks,
          releaseFromLiability: formData.releaseFromLiability,

          avoidHeat: formData.avoidHeat,
          avoidOil: formData.avoidOil,
          avoidTouching: formData.avoidTouching,
          followAftercare: formData.followAftercare,

          photographyConsent: formData.photographyConsent,

          signatureName: formData.signatureName,
          signatureDate: formData.signatureDate
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('There was an error submitting your booking. Please check your Formspree endpoint.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <Success formData={formData} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Step Content */}
        <div className="mb-12">
          {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} />}
          {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} />}
          {currentStep === 4 && <Step4 formData={formData} setFormData={setFormData} />}
          {currentStep === 5 && <Step5 formData={formData} setFormData={setFormData} />}
          {[6, 7, 8, 9].includes(currentStep) && (
            <Step6To9 currentStep={currentStep} formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 10 && <Step10 formData={formData} setFormData={setFormData} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`button-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            ← Back
          </button>

          <div className="flex gap-3">
            {currentStep < TOTAL_STEPS && (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="button-primary"
              >
                Next →
              </button>
            )}

            {currentStep === TOTAL_STEPS && (
              <form onSubmit={handleSubmit} className="inline">
                <button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className="button-primary text-lg px-8 py-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Validation Error Message */}
        {!isStepValid() && currentStep === TOTAL_STEPS && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
            Please complete all required fields before submitting.
          </div>
        )}
      </main>

      <footer className="bg-gray-50 mt-20 py-8 text-center text-sm text-gray-500">
        <p>© 2024 Lash & Brow Beauty Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
