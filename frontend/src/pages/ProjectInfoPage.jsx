// src/pages/ProjectInfoPage.js

import '../styles/ProjectInfo/ProjectInfoPage.css'; // Import the CSS file

const ProjectInfoPage = () => {
  return (
    <div className="project-info">
      <div className="section-container">
        <h1>Project Information</h1>
        <p>
          Welcome to our project! This page provides information about our
          awesome project.
        </p>
      </div>

      <div className="section-container">
        <h2>Features</h2>
        <ul>
          <li>solves problem with long URL by shortening</li>
          <li><del>shorten URL Id is customizable and depends on the availability of the Id</del></li>
          <li><del>Pagination to your all URLs, Per page contains 10 URLs</del></li>
          <li>Columns are Serial No. based on created Date, Original URL, Short URL, Copy Button, Share Button, Clicks, Created At info, and delete button</li>
          <li><del>Allows 10 free shortening per user, to make more you need to buy premium membership</del></li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript</li>
          <li>NodeJS</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>Clerk - for Google login & authentication</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Getting Started</h2>
        <p>
          Follow these steps to get started with our project:
          <ol>
            <li>Clone the repository</li>
            <li>Install dependencies</li>
            <li>Configure config.json in ./frontend and .env in ./backend</li>
            <li>Build the frontend</li>
            <li>Run the development server</li>
          </ol>
        </p>
      </div>

      <div className="section-container">
        <h2>Contribute</h2>
        <p>
          We welcome contributions! If you&apos;d like to contribute to our project,
          please follow our guidelines and submit a pull request.
        </p>
      </div>

      <div className="section-container">
        <h2>Contact</h2>
        <p>
          If you have any questions or feedback, feel free to contact us at
          project@example.com.
        </p>
      </div>

      <div className="section-container">
        <h2>GitHub Repository</h2>
        <p>
          Find the project on GitHub: <a href="https://github.com/soujash-mandal/URL-Shortener" target="_blank" rel="noopener noreferrer">URL Shortener GitHub Repository</a>
        </p>
      </div>
    </div>
  );
};

export default ProjectInfoPage;
