import React from 'react';
import './UserList.css';

const UserList = (props) => {
    return (
        <div className='table-container'>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>S</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.userData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.userName}</td>
                                <td>{item.userEmail}</td>
                                <td>{item.userMobile}</td>
                                <td>{item.userPassword}</td>
                                <td><a className='edit-btn' href="/edit-user">Edit</a></td>
                                <td><a className='delete-btn' href="/delete-user">Delete</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
