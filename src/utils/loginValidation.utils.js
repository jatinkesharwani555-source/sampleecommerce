export const loginValidation = (userFromForm, setError) => {
  const { userEmail = "", userPassword = "" } = userFromForm;
  let newErrors = {};

  if (!userEmail.trim()) newErrors.userEmail = "User Email Is Required";
  if (!userPassword.trim()) newErrors.userPassword = "UserPassword Is Require";

  setError(newErrors);
  return Object.keys(newErrors).length === 0;
}