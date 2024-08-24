import React, { useState } from 'react';
import api from '../utils/api';

const ProfileEditor = ({ restaurant }) => {
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [cuisine, setCuisine] = useState(restaurant.cuisine);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.patch(`/restaurants/${restaurant._id}`, { name, address, cuisine });
      setSaving(false);
      // Show success message or redirect
    } catch (err) {
      setError('Failed to update profile');
      setSaving(false);
      console.error(err);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name</label>
        <input 
          type="text" 
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-1">Address</label>
        <input
          type="text"
          id="address" 
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cuisine" className="block mb-1">Cuisine</label>
        <input
          type="text"
          id="cuisine"
          value={cuisine}
          onChange={e => setCuisine(e.target.value)} 
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button 
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default ProfileEditor;