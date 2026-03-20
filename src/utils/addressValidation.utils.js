export const validateAddress = (formData, setValidationError) => {
  const { name = "", phone = "", pincode = "", city = "", address="" } = formData;

  let newErrors = {};

  if (name.trim().length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    newErrors.phone = "Enter valid 10-digit mobile number";
  }

  if (!/^\d{6}$/.test(pincode)) {
    newErrors.pincode = "Enter valid 6-digit pincode";
  }

  if (city.trim() === "") {
    newErrors.city = "City is required";
  }

  if (address.trim().length < 10) {
    newErrors.address = "Address must be at least 10 characters";
  }

  setValidationError(newErrors);
  return Object.keys(newErrors).length === 0;
};