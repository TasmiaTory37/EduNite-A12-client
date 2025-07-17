import React, { useEffect } from 'react';

const StudentHome = () => {
     useEffect(() => {
              document.title = "EduNite | Student Home"; 
            }, []);
    return (
        <div>
            <h1 className='text-3xl font-bold text-blue-500 my-10 text-center'>Welcome to Student Dashboard</h1>
            
        </div>
    );
};

export default StudentHome;