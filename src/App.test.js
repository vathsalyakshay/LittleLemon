import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Little Lemon app', () => {
  render(<App />);
  const headingElement = screen.getByText(/Little Lemon/i);
  expect(headingElement).toBeInTheDocument();
});
