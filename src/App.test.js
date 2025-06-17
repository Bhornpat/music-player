import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UWU Player heading', () => {
  render(<App />);
  const heading = screen.getByText(/uwu player/i);
  expect(heading).toBeInTheDocument();
});

beforeAll(() => {
  window.HTMLMediaElement.prototype.load = () => {}; // แค่ dummy
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
});



