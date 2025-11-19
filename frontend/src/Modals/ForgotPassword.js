import React, { useState } from 'react';

const ForgotPassword = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://acvora-1.onrender.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ UsernameorEmail: email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Password reset link sent
      } else {
        setMessage(data.message); // User not found
      }

    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <section className='fixed inset-0 flex items-center justify-center bg-black/70 z-30'>
      <div className='drop-shadow-lg w-[20rem] sm:w-[30rem] rounded-xl bg-gray-100 p-6 relative'>
        <button
          className='absolute top-2 right-2 text-black font-bold'
          onClick={() => closeModal(false)}
        >
          ×
        </button>

        <h2 className='text-2xl font-semibold text-center mb-4'>Password Reset</h2>
        <p className='text-center text-gray-500 mb-6'>
          Enter your email address below. A password reset link will be sent to your email.
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            name='UsernameorEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className='border-b-2 border-gray-400 py-2 px-1 outline-none placeholder-gray-400'
          />

          <button
            type='submit'
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2'
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        {message && (
          <p className='mt-4 text-center text-sm text-gray-700'>{message}</p>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
