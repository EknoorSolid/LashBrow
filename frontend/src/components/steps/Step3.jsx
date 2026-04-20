const services = [
  {
    id: 'lash-extension',
    name: 'Lash Extension',
    description: 'Beautiful, long-lasting eyelash extensions for a glamorous look',
    icon: '✨',
  },
  {
    id: 'lash-lift-brow',
    name: 'Lash Lift & Brow Lamination',
    description: 'Enhance your natural beauty with lifted lashes and groomed brows',
    icon: '🎀',
  },
  {
    id: 'waxing',
    name: 'Waxing',
    description: 'Professional waxing for smooth, hair-free skin',
    icon: '🌸',
  },
  {
    id: 'facial',
    name: 'Facial',
    description: 'Rejuvenating facial treatments for healthy, glowing skin',
    icon: '💆',
  },
];

export default function Step3({ formData, setFormData }) {
  const handleSelectService = (serviceName) => {
    setFormData((prev) => ({
      ...prev,
      selectedService: serviceName,
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Select Your Service
        </h2>
        <p className="text-gray-500">Choose the service you'd like to book</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleSelectService(service.name)}
            className={`card-service text-left transition-all duration-300 ${
              formData.selectedService === service.name ? 'active' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{service.icon}</div>
              {formData.selectedService === service.name && (
                <div className="w-6 h-6 bg-rose-200 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
