export default function Step6To9({ currentStep, formData, setFormData }) {
  const handleCheckChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePhotographyChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      photographyConsent: value,
    }));
  };

  if (currentStep === 6) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Pre-Service Acknowledgment
          </h2>
          <p className="text-gray-500">
            Please acknowledge the following before proceeding
          </p>
        </div>

        <form className="space-y-6">
          <div className="bg-rose-50 p-6 rounded-2xl mb-6">
            <p className="text-sm text-gray-700">
              Please read and acknowledge each statement below
            </p>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="irritation-redness"
              checked={formData.understandIrritation}
              onChange={() => handleCheckChange('understandIrritation')}
              className="custom-checkbox"
            />
            <label htmlFor="irritation-redness" className="text-gray-700 cursor-pointer flex-1">
              I understand that mild irritation or redness may occur after the service
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="results-vary"
              checked={formData.understandVariableResults}
              onChange={() => handleCheckChange('understandVariableResults')}
              className="custom-checkbox"
            />
            <label htmlFor="results-vary" className="text-gray-700 cursor-pointer flex-1">
              I understand that results may vary based on individual factors
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="precare-instructions"
              checked={formData.followedPreCareInstructions}
              onChange={() => handleCheckChange('followedPreCareInstructions')}
              className="custom-checkbox"
            />
            <label htmlFor="precare-instructions" className="text-gray-700 cursor-pointer flex-1">
              I have followed all pre-care instructions provided
            </label>
          </div>
        </form>
      </div>
    );
  }

  if (currentStep === 7) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Consent & Liability
          </h2>
          <p className="text-gray-500">
            Please review and agree to the following terms
          </p>
        </div>

        <form className="space-y-6">
          <div className="bg-rose-50 p-6 rounded-2xl mb-6">
            <p className="text-sm text-gray-700">
              By proceeding, you acknowledge and agree to the following
            </p>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="consent-procedure"
              checked={formData.consentProcedure}
              onChange={() => handleCheckChange('consentProcedure')}
              className="custom-checkbox"
            />
            <label htmlFor="consent-procedure" className="text-gray-700 cursor-pointer flex-1">
              I consent to the beauty procedure as described
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="confirm-information"
              checked={formData.confirmInformation}
              onChange={() => handleCheckChange('confirmInformation')}
              className="custom-checkbox"
            />
            <label htmlFor="confirm-information" className="text-gray-700 cursor-pointer flex-1">
              I confirm all provided information is accurate and complete
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="understand-risks"
              checked={formData.understandRisks}
              onChange={() => handleCheckChange('understandRisks')}
              className="custom-checkbox"
            />
            <label htmlFor="understand-risks" className="text-gray-700 cursor-pointer flex-1">
              I understand potential risks and side effects
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="release-liability"
              checked={formData.releaseFromLiability}
              onChange={() => handleCheckChange('releaseFromLiability')}
              className="custom-checkbox"
            />
            <label htmlFor="release-liability" className="text-gray-700 cursor-pointer flex-1">
              I release the technician and salon from any liability
            </label>
          </div>
        </form>
      </div>
    );
  }

  if (currentStep === 8) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Aftercare Agreement
          </h2>
          <p className="text-gray-500">
            Please acknowledge your understanding of aftercare instructions
          </p>
        </div>

        <form className="space-y-6">
          <div className="bg-rose-50 p-6 rounded-2xl mb-6">
            <p className="text-sm text-gray-700 font-medium mb-2">
              Important: Following these instructions is essential for best results
            </p>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="avoid-heat"
              checked={formData.avoidHeat}
              onChange={() => handleCheckChange('avoidHeat')}
              className="custom-checkbox"
            />
            <label htmlFor="avoid-heat" className="text-gray-700 cursor-pointer flex-1">
              I understand to avoid heat and steam for 48 hours
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="avoid-oil"
              checked={formData.avoidOil}
              onChange={() => handleCheckChange('avoidOil')}
              className="custom-checkbox"
            />
            <label htmlFor="avoid-oil" className="text-gray-700 cursor-pointer flex-1">
              I understand to avoid oil-based products on treated areas
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="avoid-touching"
              checked={formData.avoidTouching}
              onChange={() => handleCheckChange('avoidTouching')}
              className="custom-checkbox"
            />
            <label htmlFor="avoid-touching" className="text-gray-700 cursor-pointer flex-1">
              I understand to avoid touching the treated area
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="follow-aftercare"
              checked={formData.followAftercare}
              onChange={() => handleCheckChange('followAftercare')}
              className="custom-checkbox"
            />
            <label htmlFor="follow-aftercare" className="text-gray-700 cursor-pointer flex-1">
              I agree to follow all provided aftercare instructions
            </label>
          </div>
        </form>
      </div>
    );
  }

  if (currentStep === 9) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Photography Consent
          </h2>
          <p className="text-gray-500">
            May we use photos of your results for marketing purposes?
          </p>
        </div>

        <form className="space-y-6">
          <div className="bg-rose-50 p-6 rounded-2xl mb-6">
            <p className="text-sm text-gray-700">
              Your photos would help us showcase our work and assist potential clients
            </p>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handlePhotographyChange(true)}
              className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 ${
                formData.photographyConsent === true
                  ? 'border-rose-300 bg-rose-50'
                  : 'border-gray-200 bg-white hover:border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Yes, I consent</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    You may use photos of my results
                  </p>
                </div>
                {formData.photographyConsent === true && (
                  <div className="w-6 h-6 bg-rose-200 rounded-full flex items-center justify-center">
                    <span className="text-white">✓</span>
                  </div>
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePhotographyChange(false)}
              className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 ${
                formData.photographyConsent === false
                  ? 'border-rose-300 bg-rose-50'
                  : 'border-gray-200 bg-white hover:border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">No, I decline</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Please don't use photos of my results
                  </p>
                </div>
                {formData.photographyConsent === false && (
                  <div className="w-6 h-6 bg-rose-200 rounded-full flex items-center justify-center">
                    <span className="text-white">✓</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
}
