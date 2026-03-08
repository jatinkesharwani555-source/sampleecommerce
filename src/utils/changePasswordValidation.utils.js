export const changePasswordValidation = (email, oldPassword, newPassword, setValidationError) => {
  let newErrors = {};

  if (!email.trim()) {
    newErrors.userEmail = "Email Is Required";
  }

  if (!oldPassword.trim()) {
    newErrors.oldPassword = "Old Password Is Required";
  }

  if (!newPassword.trim()) {
    newErrors.newPassword = "New Password Is Required";
  } else if (newPassword.length < 8) {
    newErrors.newPassword = "New Password Must Be Atleast 8 Characters";
  } else if (newPassword === oldPassword) {
    newErrors.newPassword = "New Password must be different from Old Password";
  }

  setValidationError(newErrors);
  return Object.keys(newErrors).length === 0;
};
