export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$|^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\D/g, '')) || phone.length === 0;
};

export const validateStep1 = (data) => {
  return (
    data.fullName.trim() !== '' &&
    data.phoneNumber.trim() !== '' &&
    validatePhoneNumber(data.phoneNumber) &&
    data.email.trim() !== '' &&
    validateEmail(data.email)
  );
};

export const validateStep2 = (data) => {
  // Step 2 is optional, always return true
  return true;
};

export const validateStep3 = (data) => {
  return data.selectedService !== '';
};

export const validateStep4 = (data) => {
  // Step 4 is optional (medical history), always return true
  return true;
};

export const validateStep5 = (data) => {
  // Step 5 depends on service selection, check if required fields are filled
  const { selectedService, lashData, facialData } = data;

  if (selectedService === 'Lash Extension') {
    return lashData.previousLashExtensions !== null;
  }

  if (selectedService === 'Lash Lift & Brow Lamination') {
    return (
      lashData.lashLiftBefore !== null &&
      lashData.browLaminationBefore !== null
    );
  }

  if (selectedService === 'Facial') {
    return facialData.skinType !== '';
  }

  // Waxing doesn't need validation
  return true;
};

export const validateStep6 = (data) => {
  return true; // Optional
};

export const validateStep7 = (data) => {
  return (
    data.consentProcedure &&
    data.confirmInformation &&
    data.understandRisks &&
    data.releaseFromLiability
  );
};

export const validateStep8 = (data) => {
  return true; // Optional but recommended
};

export const validateStep9 = (data) => {
  return true; // Optional
};

export const validateStep10 = (data) => {
  return data.signatureName.trim() !== '' && data.signatureDate !== '';
};

export const getStepValidator = (step) => {
  const validators = {
    1: validateStep1,
    2: validateStep2,
    3: validateStep3,
    4: validateStep4,
    5: validateStep5,
    6: validateStep6,
    7: validateStep7,
    8: validateStep8,
    9: validateStep9,
    10: validateStep10,
  };

  return validators[step] || (() => true);
};
