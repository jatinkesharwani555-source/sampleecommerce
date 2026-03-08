import { useState } from "react";
import { submitContactForm } from "../api/contact.api";
import { validateContactForm } from "../utils/validation.utils";

const useContactForm = (navigate) => {
  const [data, setData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setServerError("");

    const validationErrors = validateContactForm(data);
    if (Object.keys(validationErrors).length) {
      setError(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await submitContactForm({
        name: data.name,
        mobile: data.mobileNo,
        email: data.email,
        description: data.description,
      });

      if (!response.data.success) {
        setServerError(response.data.message || "Something went wrong");
        return;
      }

      alert(response.data.message || "Submitted successfully");
      setSuccess(true);
      // navigate("/");

      setData({ name: "", mobileNo: "", email: "", description: "" });
    } catch (err) {
      setServerError(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    loading,
    error,
    serverError,
    success
  };
};

export default useContactForm;
