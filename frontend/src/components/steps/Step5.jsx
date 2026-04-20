const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-prone'];

const skinConcerns = [
  'Acne',
  'Rosacea',
  'Hyperpigmentation',
  'Fine lines and wrinkles',
  'Dryness',
  'Oiliness',
  'Sensitivity',
  'Uneven skin tone',
  'Large pores',
  'Dark circles',
];

export default function Step5({ formData, setFormData }) {
  const { selectedService, lashData, facialData } = formData;

  const handleLashChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      lashData: {
        ...prev.lashData,
        [field]: value,
      },
    }));
  };

  const handleFacialChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      facialData: {
        ...prev.facialData,
        [field]: value,
      },
    }));
  };

  const toggleFacialConcern = (concern) => {
    setFormData((prev) => {
      const currentConcerns = [...prev.facialData.concerns];
      if (currentConcerns.includes(concern)) {
        return {
          ...prev,
          facialData: {
            ...prev.facialData,
            concerns: currentConcerns.filter((c) => c !== concern),
          },
        };
      } else {
        return {
          ...prev,
          facialData: {
            ...prev.facialData,
            concerns: [...currentConcerns, concern],
          },
        };
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Service Details
        </h2>
        <p className="text-gray-500">Please provide additional information</p>
      </div>

      <form className="space-y-6">
        {selectedService === 'Lash Extension' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Have you had lash extensions before?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleLashChange('previousLashExtensions', true)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.previousLashExtensions === true
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleLashChange('previousLashExtensions', false)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.previousLashExtensions === false
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {lashData.previousLashExtensions && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When was your last fill or full set?
                </label>
                <input
                  type="text"
                  value={lashData.lastFillDate}
                  onChange={(e) => handleLashChange('lastFillDate', e.target.value)}
                  placeholder="e.g., 2 weeks ago"
                  className="input-field"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you had any reactions to lash extensions before?
              </label>
              <textarea
                value={lashData.previousReactions}
                onChange={(e) => handleLashChange('previousReactions', e.target.value)}
                placeholder="Describe any previous reactions or concerns..."
                className="input-field resize-none h-24"
              />
            </div>
          </>
        )}

        {selectedService === 'Lash Lift & Brow Lamination' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Have you had a lash lift before?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleLashChange('lashLiftBefore', true)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.lashLiftBefore === true
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleLashChange('lashLiftBefore', false)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.lashLiftBefore === false
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Have you had brow lamination before?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleLashChange('browLaminationBefore', true)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.browLaminationBefore === true
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleLashChange('browLaminationBefore', false)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.browLaminationBefore === false
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you had any reactions before?
              </label>
              <textarea
                value={lashData.previousReactions}
                onChange={(e) => handleLashChange('previousReactions', e.target.value)}
                placeholder="Describe any previous reactions..."
                className="input-field resize-none h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Have you completed a patch test?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleLashChange('patchTestCompleted', true)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.patchTestCompleted === true
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Completed
                </button>
                <button
                  type="button"
                  onClick={() => handleLashChange('patchTestCompleted', false)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                    lashData.patchTestCompleted === false
                      ? 'bg-rose-200 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Declined
                </button>
              </div>
            </div>
          </>
        )}

        {selectedService === 'Facial' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your skin type?
              </label>
              <select
                value={facialData.skinType}
                onChange={(e) => handleFacialChange('skinType', e.target.value)}
                className="input-field"
              >
                <option value="">Select your skin type</option>
                {skinTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What are your main skin concerns?
              </label>
              <div className="space-y-3">
                {skinConcerns.map((concern) => (
                  <div key={concern} className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={concern}
                      checked={facialData.concerns.includes(concern)}
                      onChange={() => toggleFacialConcern(concern)}
                      className="custom-checkbox"
                    />
                    <label htmlFor={concern} className="text-gray-700 cursor-pointer flex-1">
                      {concern}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your current skincare routine (optional)
              </label>
              <textarea
                value={facialData.skincareRoutine}
                onChange={(e) => handleFacialChange('skincareRoutine', e.target.value)}
                placeholder="e.g., cleanser, toner, moisturizer, sunscreen..."
                className="input-field resize-none h-24"
              />
            </div>
          </>
        )}

        {selectedService === 'Waxing' && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No additional information needed for this service.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
