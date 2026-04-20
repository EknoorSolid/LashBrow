export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-rose-200">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-200 to-pink-200 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`progress-step ${
                index + 1 === currentStep
                  ? 'active'
                  : index + 1 < currentStep
                  ? 'completed'
                  : 'pending'
              }`}
            >
              {index + 1 < currentStep ? (
                <span>✓</span>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
