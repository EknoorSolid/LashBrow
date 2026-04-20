export default function Step2({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Emergency Contact
        </h2>
        <p className="text-gray-500">
          Please provide an emergency contact person (optional)
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.emergencyContact.name}
            onChange={handleChange}
            placeholder="Emergency contact name"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.emergencyContact.phoneNumber}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="input-field"
          />
        </div>
      </form>
    </div>
  );
}
