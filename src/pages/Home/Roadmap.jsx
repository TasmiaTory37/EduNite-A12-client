import React from 'react';

const careerPaths = [
  {
    title: "Web Developer",
    roadmap: [
      "HTML & CSS Basics",
      "JavaScript Essentials",
      "Version Control (Git/GitHub)",
      "React Framework",
      "Node.js + Express",
      "MongoDB",
      "Deployment",
      "Portfolio Projects",
      "Internship → Job",
    ],
    bundle: [
      "Intro to Web Design",
      "JavaScript Mastery",
      "React + Node Bootcamp",
      "MongoDB for Developers",
    ],
  },
  {
    title: "App Developer",
    roadmap: [
      "Java/Kotlin or Dart",
      "Mobile UI/UX",
      "State Management",
      "API Integration",
      "Firebase/SQLite",
      "App Testing",
      "Publish to Play Store",
      "Live Projects",
      "Internship → Job",
    ],
    bundle: [
      "Flutter for Beginners",
      "Mobile App UI/UX",
      "App Deployment Guide",
    ],
  },
  {
    title: "Digital Marketer",
    roadmap: [
      "Marketing Fundamentals",
      "SEO & SEM",
      "Social Media Ads",
      "Email Marketing",
      "Google Analytics",
      "Content Strategy",
      "Campaign Tools",
      "Case Studies",
      "Freelance / Agency",
    ],
    bundle: [
      "SEO Masterclass",
      "Google Ads Certification",
      "Social Media Bootcamp",
    ],
  },
  {
    title: "DevOps Engineer",
    roadmap: [
      "Linux Basics",
      "Networking & CLI",
      "Git & CI/CD",
      "Docker & Containers",
      "Kubernetes",
      "AWS/GCP Basics",
      "Monitoring Tools",
      "Scripting",
      "DevOps Job",
    ],
    bundle: [
      "Linux for DevOps",
      "Docker & Kubernetes",
      "AWS Cloud Essentials",
    ],
  },
  {
    title: "SQA Engineer",
    roadmap: [
      "SDLC/STLC Basics",
      "Manual Testing",
      "Bug Tracking Tools",
      "Test Case Writing",
      "Selenium Automation",
      "API Testing",
      "CI/CD Integration",
      "Live Projects",
      "QA Role",
    ],
    bundle: [
      "QA Fundamentals",
      "Selenium with JS",
      "Postman API Testing",
    ],
  },
  {
    title: "Data Scientist",
    roadmap: [
      "Statistics & Math",
      "Python Basics",
      "Pandas & NumPy",
      "Data Visualization",
      "SQL for Analysis",
      "Machine Learning",
      "Model Optimization",
      "Project Deployment",
      "Internship → Job",
    ],
    bundle: [
      "Python for Data Science",
      "Stats with Projects",
      "ML with Scikit-learn",
      "Streamlit Dashboards",
    ],
  },
];

const Roadmap = () => {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center">Career Roadmaps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {careerPaths.map((path, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300 transform hover:shadow-xl hover:-translate-y-1 "
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{path.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {path.roadmap.map((step, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {step}
                  </span>
                ))}
              </div>
              <p className="font-medium text-gray-700 mb-2">Recommended Classes:</p>
              <ul className="list-disc list-inside text-gray-600">
                {path.bundle.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
