import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from './survey/ReviewForm.jsx';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Test Restaurant' }]),
  })
);

describe('ReviewForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the form', async () => {
    render(<ReviewForm />);
    
    await waitFor(() => {
      expect(screen.getByText('Restaurant')).toBeInTheDocument();
      expect(screen.getByText('Food Rating')).toBeInTheDocument();
      expect(screen.getByText('Service Rating')).toBeInTheDocument();
      expect(screen.getByText('Ambience Rating')).toBeInTheDocument();
      expect(screen.getByText('Comments')).toBeInTheDocument();
      expect(screen.getByText('Submit Review')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<ReviewForm />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Restaurant'), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText('Food Rating'), { target: { value: '4' } });
      fireEvent.change(screen.getByLabelText('Service Rating'), { target: { value: '5' } });
      fireEvent.change(screen.getByLabelText('Ambience Rating'), { target: { value: '3' } });
      fireEvent.change(screen.getByLabelText('Comments'), { target: { value: 'Great experience!' } });
    });

    fireEvent.click(screen.getByText('Submit Review'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/reviews', expect.any(Object));
    });
  });
});