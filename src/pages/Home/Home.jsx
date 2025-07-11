import React from 'react';
import Banner from './Banner';
import Partner from './Partner';
import Teacher from './Teacher';
import Roadmap from './Roadmap';
import SuccessStories from './SuccessStories';
import PopularCourses from './PopularCourses';
import Feedback from './Feedback';
import Achievements from './Stats';

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularCourses/>
            <Roadmap/>
            <Feedback/>
            <Achievements/>
            <SuccessStories />
            <Partner/>
            <Teacher/>
           
            
        </div>
    );
};

export default Home;