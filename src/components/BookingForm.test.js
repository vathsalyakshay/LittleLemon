import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './BookingForm';

const mockAvailableTimes = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30'
];

const mockUpdateTimes = jest.fn();

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('BookingForm Component', () => {
  beforeEach(() => {
    mockUpdateTimes.mockClear();
  });

  describe('Initial Render', () => {
    test('renders step 1 form initially', () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      expect(screen.getByText('Reservation Details')).toBeInTheDocument();
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of diners/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    test('renders progress indicator with step 1 active', () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const steps = screen.getAllByText(/1|2/);
      expect(steps.length).toBeGreaterThan(0);
      expect(screen.getByText('Reservation Details')).toBeInTheDocument();
      expect(screen.getByText('Your Information')).toBeInTheDocument();
    });
  });

  describe('Step 1 - Reservation Details Validation', () => {
    test('shows error when submitting empty form', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
        expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
        expect(screen.getByText(/please select number of diners/i)).toBeInTheDocument();
      });
    });

    test('shows error for past date selection', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const dateInput = screen.getByLabelText(/date/i);
      const pastDate = '2023-01-01';

      fireEvent.change(dateInput, { target: { value: pastDate } });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText(/please select a future date/i)).toBeInTheDocument();
      });
    });

    test('shows error for invalid number of diners', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const dinersInput = screen.getByLabelText(/number of diners/i);

      fireEvent.change(dinersInput, { target: { value: '0' } });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText(/number of diners must be between 1 and 20/i)).toBeInTheDocument();
      });
    });

    test('clears error when user corrects input', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const dateInput = screen.getByLabelText(/date/i);
      const nextButton = screen.getByRole('button', { name: /next/i });

      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      });

      const today = new Date().toISOString().split('T')[0];
      fireEvent.change(dateInput, { target: { value: today } });

      await waitFor(() => {
        expect(screen.queryByText(/please select a date/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Step 1 to Step 2 Navigation', () => {
    test('navigates to step 2 with valid data', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const today = new Date().toISOString().split('T')[0];

      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const dinersInput = screen.getByLabelText(/number of diners/i);

      fireEvent.change(dateInput, { target: { value: today } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(dinersInput, { target: { value: '4' } });

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.queryByLabelText(/date/i)).not.toBeInTheDocument();
      }, { timeout: 3000 });

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /confirm reservation/i })).toBeInTheDocument();
    });
  });

  describe('Step 2 - User Information Validation', () => {
    beforeEach(async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const today = new Date().toISOString().split('T')[0];

      fireEvent.change(screen.getByLabelText(/date/i), { target: { value: today } });
      fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
      fireEvent.change(screen.getByLabelText(/number of diners/i), { target: { value: '4' } });

      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.queryByLabelText(/date/i)).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('shows errors when submitting empty step 2 form', async () => {
      const confirmButton = screen.getByRole('button', { name: /confirm reservation/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      });
    });

    test('shows error for short first name', async () => {
      const firstNameInput = screen.getByLabelText(/first name/i);

      fireEvent.change(firstNameInput, { target: { value: 'J' } });
      fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

      await waitFor(() => {
        expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    test('shows error for short last name', async () => {
      const lastNameInput = screen.getByLabelText(/last name/i);

      fireEvent.change(lastNameInput, { target: { value: 'D' } });
      fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

      await waitFor(() => {
        expect(screen.getByText(/last name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    test('shows error for invalid phone number', async () => {
      const phoneInput = screen.getByLabelText(/phone number/i);

      fireEvent.change(phoneInput, { target: { value: '123' } });
      fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
      });
    });

    test('accepts valid phone numbers', async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });

      fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid phone number/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Back Navigation', () => {
    test('navigates back to step 1 from step 2', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const today = new Date().toISOString().split('T')[0];

      fireEvent.change(screen.getByLabelText(/date/i), { target: { value: today } });
      fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
      fireEvent.change(screen.getByLabelText(/number of diners/i), { target: { value: '4' } });

      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /back/i }));

      await waitFor(() => {
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of diners/i)).toBeInTheDocument();
      });
    });

    test('preserves form data when navigating back', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const today = new Date().toISOString().split('T')[0];

      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const dinersInput = screen.getByLabelText(/number of diners/i);

      fireEvent.change(dateInput, { target: { value: today } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(dinersInput, { target: { value: '4' } });

      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole('button', { name: /back/i }));

      await waitFor(() => {
        expect(dateInput).toHaveValue(today);
        expect(timeInput).toHaveValue('18:00');
        expect(dinersInput).toHaveValue(4);
      });
    });
  });

  describe('Form Submission', () => {
    test('shows toast notification on successful submission', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const today = new Date().toISOString().split('T')[0];

      fireEvent.change(screen.getByLabelText(/date/i), { target: { value: today } });
      fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
      fireEvent.change(screen.getByLabelText(/number of diners/i), { target: { value: '4' } });

      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });

      fireEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

      await waitFor(() => {
        expect(screen.getByText(/reservation confirmed successfully/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('all form inputs have proper labels', () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of diners/i)).toBeInTheDocument();
    });

    test('error messages are associated with inputs', async () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        const dateInput = screen.getByLabelText(/date/i);
        expect(dateInput).toHaveAttribute('aria-invalid', 'true');
        expect(dateInput).toHaveAttribute('aria-describedby', 'date-error');
      });
    });

    test('required fields are marked as required', () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      expect(screen.getByLabelText(/date/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/time/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/number of diners/i)).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Parent Component Integration', () => {
    test('calls updateTimes when date changes', () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const today = new Date().toISOString().split('T')[0];
      const dateInput = screen.getByLabelText(/date/i);

      fireEvent.change(dateInput, { target: { value: today } });

      expect(mockUpdateTimes).toHaveBeenCalledWith(today);
      expect(mockUpdateTimes).toHaveBeenCalledTimes(1);
    });

    test('renders time options from availableTimes prop', () => {
      renderWithRouter(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

      const timeSelect = screen.getByLabelText(/time/i);
      const options = timeSelect.querySelectorAll('option');

      // Should have "Select a time" plus all available times
      expect(options.length).toBe(mockAvailableTimes.length + 1);
    });
  });
});
