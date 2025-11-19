import React, { useState } from 'react';
import "./Reviews.css";


const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const maxCharacters = 500;

  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setReviewText(e.target.value);
    }
  };

  return (
    <div style={{ backgroundColor: '#fffefc', minHeight: '100vh', padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#000000', marginBottom: '1rem' }}>Add Review</h2>
        <div style={{ backgroundColor: '#fffefc', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', border: '2px solid #fcd34d', marginBottom: '1.5rem' }}>
          <textarea
            style={{
              width: '100%',
              height: '6rem',
              padding: '0.5rem',
              border: '2px solid #fde047',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              resize: 'none'
            }}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={handleReviewChange}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <label style={{ marginRight: '0.5rem', color: '#374151' }}>Give rating:</label>
            <div style={{ display: 'flex' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: star <= rating ? '#facc15' : '#e5e7eb'
                  }}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#374151' }}>characters: {reviewText.length} / {maxCharacters}</span>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#fef9c3',
                color: '#000000',
                borderRadius: '0.375rem',
                cursor: 'not-allowed',
                border: '2px solid #fcd34d'
              }}
              disabled
            >
              Login to Submit
            </button>
          </div>
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#000000', marginBottom: '1rem' }}>Reviews</h2>
        <div style={{ backgroundColor: '#fffefc', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', border: '2px solid #fcd34d' }}>
          <p style={{ color: '#374151', marginBottom: '0.5rem' }}>1 Review:</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', fontSize: '1.5rem', color: '#facc15' }}>
              ★★★★★★★★☆☆
            </div>
            <span style={{ marginLeft: '0.5rem', color: '#374151' }}>8 / 10</span>
            <span style={{ marginLeft: 'auto', color: '#d97706' }}>Anurag 22 March 2025</span>
          </div>
          <p style={{ color: '#374151' }}>
            The campus is equipped with modern infrastructure, state-of-the-art laboratories, and sports facilities, creating a holistic environment for students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
