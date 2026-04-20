const medicalConditions = [
  'Sensitive skin',
  'Sensitive eyes',
  'Dry eyes',
  'Watery eyes',
  'Allergies',
  'Eczema / Psoriasis',
  'Dermatitis',
  'Rosacea',
  'Eye infection',
  'Recent eye surgery',
  'Skin irritation or cuts',
  'Varicose veins',
  'Diabetes',
  'Sunburn or recent tanning',
  'Using medications (Retin-A, Accutane, etc.)',
  'Blood thinners',
  'Pregnancy or breastfeeding',
  'Other',
];

export default function Step4({ formData, setFormData }) {
  const handleCheckChange = (condition) => {
    setFormData((prev) => {
      const currentConditions = [...prev.medicalHistory];
      if (currentConditions.includes(condition)) {
        return {
          ...prev,
          medicalHistory: currentConditions.filter((c) => c !== condition),
        };
      } else {
        return {
          ...prev,
          medicalHistory: [...currentConditions, condition],
        };
      }
    });
  };

  const handleOtherChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistoryOther: e.target.value,
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Medical & Skin History
        </h2>
        <p className="text-gray-500">
          Please check any conditions that apply to you
        </p>
      </div>

      <form className="space-y-4">
        {medicalConditions.map((condition) => (
          <div key={condition} className="checkbox-wrapper">
            <input
              type="checkbox"
              id={condition}
              checked={formData.medicalHistory.includes(condition)}
              onChange={() => handleCheckChange(condition)}
              className="custom-checkbox"
            />
            <label htmlFor={condition} className="text-gray-700 cursor-pointer flex-1">
              {condition}
            </label>
          </div>
        ))}

        {formData.medicalHistory.includes('Allergies') && (
          <div className="mt-6 pl-8 border-l-2 border-rose-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify your allergies
            </label>
            <input
              type="text"
              value={formData.allergiesDetails}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  allergiesDetails: e.target.value,
                }))
              }
              placeholder="e.g., latex, acrylic, specific chemicals..."
              className="input-field"
            />
          </div>
        )}

        {formData.medicalHistory.includes('Other') && (
          <div className="mt-6 pl-8 border-l-2 border-rose-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify other conditions
            </label>
            <textarea
              value={formData.medicalHistoryOther}
              onChange={handleOtherChange}
              placeholder="Describe any other relevant medical conditions..."
              className="input-field resize-none h-24"
            />
          </div>
        )}
      </form>
    </div>
  );
}
