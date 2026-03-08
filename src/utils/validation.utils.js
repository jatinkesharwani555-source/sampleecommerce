export const validateContactForm = ({ name, mobileNo, email, description }) => {
  const errors = {};

  if (!name.trim()) errors.name = "Name is required";

  if (!mobileNo.trim()) {
    errors.mobileNo = "Mobile Number is required";
  } else if (!/^[6-9]\d{9}$/.test(mobileNo)) {
    errors.mobileNo = "Enter a valid 10-digit mobile number";
  }

  if (!email.trim()) errors.email = "Email is required";
  if (!description.trim()) errors.description = "Description is required";

  return errors;
};
