import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getLoggingOutApi } from '../../../api/logout.api';

const Logout = (props) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const handleLogout = async () => {
    setServerError(null);
    try {
      const response = await getLoggingOutApi();
      if(!response.data.success){
        setServerError(response.data.message || "SOMETHING WENT WRONG");
        return;
      }
      props.setLoggedIn(false);
      props.setRole(null);
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "SOMETHING WENT WRONG");
    }
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      {serverError && <p className='error'>{serverError}</p>}
      <h1>Logging Out...</h1>
    </div>
  )
}

export default Logout
