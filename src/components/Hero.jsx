import React from 'react';
import './Hero.css';

const Hero = ({ job, scrollToSection }) => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {job.title}
            </h1>
            
            <p className="hero-description">
              {job.description}
            </p>
            
            <div className="hero-meta">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <span>{job.salary}</span>
            </div>
            
            <div className="hero-actions">
              <button 
                className="btn-primary"
                onClick={() => scrollToSection('apply')}
              >
                Apply Now
              </button>
              <button 
                className="btn-secondary"
                onClick={() => scrollToSection('job-details')}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
