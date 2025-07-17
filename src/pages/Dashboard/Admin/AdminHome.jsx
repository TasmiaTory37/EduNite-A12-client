import React, { useEffect } from 'react';

const AdminHome = () => {
     useEffect(() => {
              document.title = "EduNite | Admin Home"; 
            }, []);
    return (
        <div>
            <h1 className='text-3xl font-bold text-blue-500 my-10 text-center'>Welcome to Admin Dashboard</h1>
            
        </div>
    );
};

export default AdminHome;