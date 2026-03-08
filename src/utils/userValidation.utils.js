export const userValidation = (userData,setError) => {
  const { userName="", userEmail="", userMobileNo="", userPassword="" } = userData;

  let newErrors = {};

  if (!userName.trim()) newErrors.userName = "User Name Is Required";
  if (!userEmail.trim()) newErrors.userEmail = "User Email Is Required";
  if (!userMobileNo) {
    newErrors.userMobileNo = "User Mobile Number Is Required";
  } else if (!/^[6-9]\d{9}$/.test(userMobileNo)) {
    newErrors.userMobileNo = "Enter Valid 10 Digit Mobile Number";
  }
  if (!userPassword.trim()) {
    newErrors.userPassword = "User Password Is Required";
  } else if (userPassword.length < 8) {
    newErrors.userPassword = "User Password Must Be Atleast 8 Digits";
  }

  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};