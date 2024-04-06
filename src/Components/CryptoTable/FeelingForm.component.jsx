import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const FeelingForm = ({ isOpen, onClose }) => {
  const [feeling, setFeeling] = useState('');

  const handleFeelingChange = (event) => {
    setFeeling(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Save 'feeling' to the database
      await axios.post('your_api_endpoint', { feeling });
      onClose(); // Close the modal after successfully saving
    } catch (error) {
      console.error('Error saving feeling:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
        },
        content: {
          backgroundColor: '#333', // Dark background color for the modal content
          color: '#fff', // Text color
          border: 'none', // Remove border
          borderRadius: '8px', // Rounded corners
          maxWidth: '400px', // Max width of the modal
          margin: 'auto', // Center the modal horizontally
          padding: '20px', // Padding inside the modal
        },
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        How are you feeling today in Crypto Trading?
      </h2>
      <form>
      <label style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }}>
  <input
    type="radio"
    name="feeling"
    value="Extremely Stressed"
    checked={feeling === 'Extremely Stressed'}
    onChange={handleFeelingChange}
    style={{ marginRight: '5px' }}
  />
  Extremely Stressed
</label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="feeling"
            value="Stressed"
            checked={feeling === 'Stressed'}
            onChange={handleFeelingChange}
          />
          Stressed
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="feeling"
            value="Neutral"
            checked={feeling === 'Neutral'}
            onChange={handleFeelingChange}
          />
          Neutral
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="feeling"
            value="Happy"
            checked={feeling === 'Happy'}
            onChange={handleFeelingChange}
          />
          Happy
        </label>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
            width: '100%',
          }}
        >
          Save
        </button>
      </form>
    </Modal>
  );
};

export default FeelingForm;