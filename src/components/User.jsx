import React, { useState, useEffect } from 'react'
import styles from "./User.module.css";
import CreateUser from './CreateUser'
import UserList from './UserList';

const User = () => {

  // UseState Of Create Users
  const [createUserDetails, setCreateUserDetails] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    userPassword: ""
  });

  // UseState Of Get Users 
  const [userData, setUserData] = useState([]);

  // HandleChange Function 
  const handleChange = (e) => {
    setCreateUserDetails({
      ...createUserDetails,
      [e.target.name]: e.target.value
    });
  };

  // FetchingData Function 
  const fetchingData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/read-client");
        const data = await response.json();
        setUserData(data.allUser);
        console.log("Your Table Data: ", data.allUser);
      } catch (err) {
        console.log("Error Fetching Data: ", err);
      }
    }

  // FetchingData Function Call Under UseEffect 
  useEffect(() => {
    fetchingData();
  }, [])

  // handleSubmit Function 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${createUserDetails.userName}\nEmail: ${createUserDetails.userEmail}\nMobile: ${createUserDetails.userMobile}\nPassword: ${createUserDetails.userPassword}`);

    const sendingData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/create-client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createUserDetails)
        });
        const data = await response.json();
        console.log("Response From Backend: ", data);
        // Call FetchingData Function 
        fetchingData();
      }
      catch (error) {
        console.error("Error Sending Data: ", error);
      }
    }

    sendingData();
    // Reset Input Boxes 
    setCreateUserDetails({
      userName: "",
      userEmail: "",
      userMobile: "",
      userPassword: ""
    });
  };

  return (
    <>
      <CreateUser handleSubmit={handleSubmit} handleChange={handleChange} inputValue={createUserDetails} />
      <UserList userData={userData} />
    </>
  )
}

export default User
