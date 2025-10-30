import React from 'react';
import './JobDetails.css';

const JobDetails = ({ job }) => {
  return (
    <section id="job-details" className="job-details-section">
      <div className="container">
        <div className="section-header">
          <h2>Job Details</h2>
        </div>

        <div className="job-overview">
          <div className="overview-grid">
            <div className="overview-item">
              <strong>Role:</strong> {job.role}
            </div>
            <div className="overview-item">
              <strong>Salary:</strong> {job.salary}
            </div>
            <div className="overview-item">
              <strong>Experience:</strong> {job.experience}
            </div>
            <div className="overview-item">
              <strong>Location:</strong> {job.location}
            </div>
          </div>
        </div>

        <div className="job-details-grid">
          <div className="detail-card">
            <h3>Job Description</h3>
            <p>{job.description}</p>
          </div>

          <div className="detail-card">
            <h3>Requirements</h3>
            <ul>
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="detail-card">
            <h3>Key Responsibilities</h3>
            <ul>
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>

          <div className="detail-card">
            <h3>Benefits</h3>
            <ul>
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
