import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ReviewForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        const errorData = await response.json();
        setSubmitStatus(`error:${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error:network');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 space-y-6">
      {['food', 'service', 'ambience'].map((category) => (
        <div key={category}>
          <label className="block mb-2 font-bold text-gray-700 capitalize">{category} Rating</label>
          <input
            type="number"
            {...register(`${category}Rating`, { 
              required: `Please rate the ${category}`,
              min: { value: 1, message: 'Rating must be at least 1' },
              max: { value: 5, message: 'Rating must be at most 5' }
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[`${category}Rating`] && <p className="mt-1 text-sm text-red-600">{errors[`${category}Rating`].message}</p>}
        </div>
      ))}

      <div>
        <label className="block mb-2 font-bold text-gray-700">Comments</label>
        <textarea
          {...register('comments', { maxLength: { value: 500, message: 'Comments must be less than 500 characters' } })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        {errors.comments && <p className="mt-1 text-sm text-red-600">{errors.comments.message}</p>}
      </div>

      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Submit Review
      </button>

      {submitStatus && (
        <div className={`mt-4 p-2 rounded-md ${submitStatus.startsWith('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {submitStatus === 'success' 
            ? 'Review submitted successfully!' 
            : submitStatus === 'error:network'
              ? 'Network error. Please try again.'
              : `Error: ${submitStatus.split(':')[1]}`}
        </div>
      )}
    </form>
  );
};

export default ReviewForm;