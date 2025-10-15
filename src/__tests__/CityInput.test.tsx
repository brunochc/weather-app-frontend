import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CityInput from '../components/CityInput';

describe('CityInput', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders input and button', () => {
    const { getByPlaceholderText, getByRole } = render(<CityInput onSubmit={mockOnSubmit} />);
    expect(getByPlaceholderText('Enter city name')).toBeInTheDocument();
    expect(getByRole('button', { name: /get weather/i })).toBeInTheDocument();
  });

  it('shows suggestions when typing', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText } = render(<CityInput onSubmit={mockOnSubmit} />);
    const input = getByPlaceholderText('Enter city name');
    await user.type(input, 'Lon');
    expect(getByText('London')).toBeInTheDocument();
  });

  it('hides suggestions when no match', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, queryByText } = render(<CityInput onSubmit={mockOnSubmit} />);
    const input = getByPlaceholderText('Enter city name');
    await user.type(input, 'xyz');
    expect(queryByText('London')).not.toBeInTheDocument();
  });

  it('calls onSubmit with city on form submit', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole } = render(<CityInput onSubmit={mockOnSubmit} />);
    const input = getByPlaceholderText('Enter city name');
    const button = getByRole('button', { name: /get weather/i });
    await user.type(input, 'London');
    await user.click(button);
    expect(mockOnSubmit).toHaveBeenCalledWith('London');
  });

  it('clears input after submit', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole } = render(<CityInput onSubmit={mockOnSubmit} />);
    const input = getByPlaceholderText('Enter city name');
    const button = getByRole('button', { name: /get weather/i });
    await user.type(input, 'London');
    await user.click(button);
    expect(input).toHaveValue('');
  });
});
