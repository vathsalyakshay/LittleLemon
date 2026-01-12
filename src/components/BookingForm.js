import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';
import Toast from './Toast';

const BookingForm = ({ availableTimes = [], updateTimes }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    diners: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];

      if (formData.date < todayString) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.diners) {
      newErrors.diners = 'Please select number of diners';
    } else if (formData.diners < 1 || formData.diners > 20) {
      newErrors.diners = 'Number of diners must be between 1 and 20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update available times when date changes
    if (name === 'date' && updateTimes) {
      updateTimes(value);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (validateStep2()) {
      setShowToast(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <>
      {showToast && (
        <Toast
          message="Reservation confirmed successfully! Redirecting to home page..."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="booking-form-container">
        <div className="progress-indicator">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Reservation Details</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Your Information</div>
          </div>
        </div>

        {currentStep === 1 && (
          <form className="booking-form" onSubmit={handleNext}>
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getTodayDate()}
                className={errors.date ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.date ? 'true' : 'false'}
                aria-describedby={errors.date ? 'date-error' : undefined}
              />
              {errors.date && (
                <span id="date-error" className="error-message" role="alert">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.time ? 'true' : 'false'}
                aria-describedby={errors.time ? 'time-error' : undefined}
              >
                <option value="">Select a time</option>
                {availableTimes.map((time) => {
                  const hour = parseInt(time.split(':')[0]);
                  const minute = time.split(':')[1];
                  const period = hour >= 12 ? 'PM' : 'AM';
                  const displayHour = hour > 12 ? hour - 12 : hour;
                  const displayTime = `${displayHour}:${minute} ${period}`;

                  return (
                    <option key={time} value={time}>
                      {displayTime}
                    </option>
                  );
                })}
              </select>
              {errors.time && (
                <span id="time-error" className="error-message" role="alert">
                  {errors.time}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="diners">Number of Diners *</label>
              <input
                type="number"
                id="diners"
                name="diners"
                value={formData.diners}
                onChange={handleChange}
                min="1"
                max="20"
                placeholder="Enter number of guests"
                className={errors.diners ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.diners ? 'true' : 'false'}
                aria-describedby={errors.diners ? 'diners-error' : undefined}
              />
              {errors.diners && (
                <span id="diners-error" className="error-message" role="alert">
                  {errors.diners}
                </span>
              )}
            </div>

            <button type="submit" className="form-button next-button">
              Next
            </button>
          </form>
        )}

        {currentStep === 2 && (
          <form className="booking-form" onSubmit={handleConfirm}>
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={errors.firstName ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              {errors.firstName && (
                <span id="firstName-error" className="error-message" role="alert">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={errors.lastName ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              />
              {errors.lastName && (
                <span id="lastName-error" className="error-message" role="alert">
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={errors.phone ? 'error' : ''}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="form-button back-button"
                onClick={handleBack}
              >
                Back
              </button>
              <button type="submit" className="form-button confirm-button">
                Confirm Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default BookingForm;
