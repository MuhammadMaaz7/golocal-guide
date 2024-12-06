export const validateName = (name) => {
  if (!name || name.trim().length < 3) {
    return "Name must be at least 3 characters long";
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one capital letter";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
};

export const validatePhone = (phone) => {
  // Remove any non-digit characters
  const cleanedPhone = phone.replace(/\D/g, '');
  
  // Check if the length is between 7 and 15 digits (common range for international numbers)
  if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
    return "Phone number must be between 7 and 15 digits";
  }
  
  return null;
};


export const validateLanguages = (languages) => {
  const languageList = languages.split(',').map(lang => lang.trim());
  const validLanguages = languageList.every(lang => /^[a-zA-Z]+$/.test(lang));
  if (!validLanguages) {
    return "Please enter valid languages separated by commas";
  }
  return null;
};

export const validateYears = (years) => {
  const yearsNumber = parseInt(years, 10);
  if (isNaN(yearsNumber) || yearsNumber < 0 || yearsNumber > 100) {
    return "Please enter a valid number of years (0-100)";
  }
  return null;
};
