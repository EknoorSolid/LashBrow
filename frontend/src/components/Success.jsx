export default function Success({ formData }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="inline-block">
              <div className="text-6xl mb-4">✓</div>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-200 to-pink-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">💫</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Booking Confirmed!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing our beauty services, {formData.fullName}!
          </p>

          <div className="bg-rose-50 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Booking Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-rose-100">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold text-gray-800">
                  {formData.selectedService}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-rose-100">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-gray-800">
                  {formData.fullName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-rose-100">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-800">
                  {formData.email}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold text-gray-800">
                  {formData.phoneNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Please check your email for booking details and any further instructions.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              We look forward to seeing you soon!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="button-primary"
            >
              Create Another Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
