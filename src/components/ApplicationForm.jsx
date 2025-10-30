import React, { useState } from 'react';
import './ApplicationForm.css';

const ApplicationForm = ({ jobTitle }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    address: '',
    skills: [],
    githubLink: '',
    age: '',
    resume: null,
    collegeName: '',
    passingYear: '',
    email: '',
    phoneNumber: ''
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('github.com');
    } catch {
      return false;
    }
  };

  const validateAge = (age) => {
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 60;
  };

  const validateYear = (year) => {
    const yearNum = parseInt(year);
    return !isNaN(yearNum) && yearNum >= 1950;
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
    
    if (errors.resume) {
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, currentSkill.trim()]
        }));
        setCurrentSkill('');
        
        if (errors.skills) {
          setErrors(prev => ({
            ...prev,
            skills: ''
          }));
        }
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const removeResume = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
    
    // Clear the file input
    const fileInput = document.getElementById('resume');
    if (fileInput) {
      fileInput.value = '';
    }
    
    // Clear any resume errors
    if (errors.resume) {
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Candidate name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    if (!formData.githubLink.trim()) {
      newErrors.githubLink = 'GitHub link is required';
    } else if (!validateURL(formData.githubLink)) {
      newErrors.githubLink = 'Please enter a valid GitHub URL';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (!validateAge(formData.age)) {
      newErrors.age = 'Age must be between 18 and 60';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume upload is required';
    } else if (!validateFile(formData.resume)) {
      newErrors.resume = 'Please upload a valid PDF or DOC file (max 5MB)';
    }

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }

    if (!formData.passingYear.trim()) {
      newErrors.passingYear = 'Passing year is required';
    } else if (!validateYear(formData.passingYear)) {
      newErrors.passingYear = 'Please enter a valid year';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Optional phone validation
    if (formData.phoneNumber && !validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;
    
    const rawEndpoint = import.meta.env.VITE_CANDIDATES_ENDPOINT;
    // Ensure trailing slash for Django when APPEND_SLASH is True
    const endpoint = rawEndpoint && /\/$/.test(rawEndpoint) ? rawEndpoint : `${rawEndpoint || ''}/`;
    if (!rawEndpoint) {
      setSubmitError('Submission endpoint is not configured. Please set VITE_CANDIDATES_ENDPOINT in your .env file.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      // Build multipart form data
      const data = new FormData();
      // Map to backend expected keys
      data.append('name', formData.candidateName);
      data.append('address', formData.address);
      data.append('github_link', formData.githubLink);
      data.append('age', formData.age);
      data.append('college_name', formData.collegeName);
      data.append('passing_year', formData.passingYear);
      data.append('email', formData.email);
      if (formData.phoneNumber) data.append('phone_number', formData.phoneNumber);
      // Backend expects a string for skills (e.g., "Django, Python, REST API")
      data.append('skills', formData.skills.join(', '));
      if (formData.resume) data.append('resume', formData.resume);
      
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
      });
      
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed with status ${res.status}`);
      }
      
      // Success
      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        candidateName: '',
        address: '',
        skills: [],
        githubLink: '',
        age: '',
        resume: null,
        collegeName: '',
        passingYear: '',
        email: '',
        phoneNumber: ''
      });
      setCurrentSkill('');
    } catch (err) {
      console.error('Failed to submit application:', err);
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="apply" className="application-section">
        <div className="container">
          <div className="success-message">
            <h2>Application Submitted Successfully!</h2>
            <p>Thank you for applying for the {jobTitle} position. We will review your application and get back to you soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="application-section">
      <div className="container">
        <div className="section-header">
          <h2>Apply for {jobTitle}</h2>
        </div>
        
        <div className="application-form-container">
          <form onSubmit={handleSubmit}>
        {/* Candidate Name */}
        <div className={`form-group ${errors.candidateName ? 'error' : ''}`}>
          <label htmlFor="candidateName">
            Candidate Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="candidateName"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
          {errors.candidateName && <span className="error">{errors.candidateName}</span>}
        </div>

        {/* Address */}
        <div className={`form-group ${errors.address ? 'error' : ''}`}>
          <label htmlFor="address">
            Address <span className="required">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your complete address"
            rows="3"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {/* Skills */}
        <div className={`form-group ${errors.skills ? 'error' : ''}`}>
          <label htmlFor="skills">
            Skills <span className="required">*</span>
          </label>
          <input
            type="text"
            id="skills"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={addSkill}
            placeholder="Type a skill and press Enter"
          />
          <button type="button" onClick={addSkill} style={{marginTop: '10px', padding: '8px 16px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
            Add Skill
          </button>
          <div className="skills-container">
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>×</button>
              </div>
            ))}
          </div>
          {errors.skills && <span className="error">{errors.skills}</span>}
        </div>

        {/* GitHub Link */}
        <div className={`form-group ${errors.githubLink ? 'error' : ''}`}>
          <label htmlFor="githubLink">
            GitHub Link <span className="required">*</span>
          </label>
          <input
            type="url"
            id="githubLink"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleInputChange}
            placeholder="Enter Github Link"
          />
          {errors.githubLink && <span className="error">{errors.githubLink}</span>}
        </div>

        {/* Age */}
        <div className={`form-group ${errors.age ? 'error' : ''}`}>
          <label htmlFor="age">
            Age <span className="required">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            min="18"
            max="60"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        {/* Resume Upload */}
        <div className={`form-group ${errors.resume ? 'error' : ''}`}>
          <label htmlFor="resume">
            Resume Upload <span className="required">*</span>
          </label>
          <div className="file-upload">
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <label 
              htmlFor="resume" 
              className={`file-upload-label ${formData.resume ? 'file-selected' : ''}`}
            >
              {formData.resume ? 'File Selected' : 'Choose PDF or DOC file (max 5MB)'}
            </label>
          </div>
          
          {/* Resume Preview */}
          {formData.resume && (
            <div className="resume-preview">
              <div className="resume-item">
                <div className="resume-info">
                  <span className="resume-icon">📄</span>
                  <div className="resume-details">
                    <span className="resume-name">{formData.resume.name}</span>
                    <span className="resume-size">
                      {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeResume}
                  className="remove-resume-btn"
                  title="Remove resume"
                >
                  ×
                </button>
              </div>
            </div>
          )}
          
          {errors.resume && <span className="error">{errors.resume}</span>}
        </div>

        {/* Education */}
        <div className="form-group">
          <label>
            Education <span className="required">*</span>
          </label>
          <div className="education-fields">
            <div className={errors.collegeName ? 'error' : ''}>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                placeholder="College/University Name"
              />
              {errors.collegeName && <span className="error">{errors.collegeName}</span>}
            </div>
            <div className={errors.passingYear ? 'error' : ''}>
              <input
                type="number"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleInputChange}
                placeholder="Passing Year"
                min="1950"
              />
              {errors.passingYear && <span className="error">{errors.passingYear}</span>}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email Address"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className={`form-group ${errors.phoneNumber ? 'error' : ''}`}>
          <label htmlFor="phoneNumber">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Your Phone Number"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

            {submitError && (
              <div className="error" style={{ marginBottom: '12px' }}>{submitError}</div>
            )}
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
