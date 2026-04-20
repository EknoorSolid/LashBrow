export default function Step10({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Digital Signature
        </h2>
        <p className="text-gray-500">
          Please sign and confirm your booking details
        </p>
      </div>

      <form className="space-y-8">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 rounded-2xl border-2 border-rose-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Booking Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium text-gray-800">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium text-gray-800">{formData.selectedService}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-800">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-800">{formData.phoneNumber}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type your full name as digital signature <span className="text-rose-300">*</span>
          </label>
          <input
            type="text"
            name="signatureName"
            value={formData.signatureName}
            onChange={handleChange}
            placeholder="Your full name"
            className="input-field text-xl tracking-wide"
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            By typing your name, you are digitally signing this form
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Today's Date <span className="text-rose-300">*</span>
          </label>
          <input
            type="date"
            name="signatureDate"
            value={formData.signatureDate}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <p className="text-sm text-blue-800">
            ℹ️ By completing this form and submitting, you acknowledge that you have read, understood, and agree to all terms and conditions.
          </p>
        </div>
      </form>
    </div>
  );
}
