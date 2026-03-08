import React from 'react';

const CreateUser = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="userName">User Name : </label>
                <input type="text" name='userName' placeholder='Enter Your UserName Here...' className='form-username' value={props.inputValue.userName} onChange={props.handleChange} />

                <label htmlFor="userMobile">User Mobile : </label>
                <input type="number" name='userMobile' placeholder='Enter Your UserMobile Here...' className='form-userMobile' value={props.inputValue.userMobile} onChange={props.handleChange} />

                <label htmlFor="userEmail">User Email : </label>
                <input type="email" name='userEmail' placeholder='Enter Your UserEmail Here...' className='form-useremail' value={props.inputValue.userEmail} onChange={props.handleChange} />

                <label htmlFor="userPassword">User Password : </label>
                <input type="password" name='userPassword' placeholder='Enter Your UserPassword Here...' className='form-userpassword' value={props.inputValue.userPassword} onChange={props.handleChange} />

                <button className='form-submit-btn'>Submit</button>
            </form>
        </div>
    )
}

export default CreateUser
