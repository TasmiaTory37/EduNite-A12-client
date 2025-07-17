import React, { useEffect } from 'react';

const TeacherHome = () => {
     useEffect(() => {
              document.title = "EduNite | Teacher Home"; 
            }, []);
    return (
         <div>
            <h1 className='text-3xl font-bold text-blue-500 my-10 text-center'>Welcome to Teacher Dashboard</h1>
            
        </div>
    );
};

export default TeacherHome;