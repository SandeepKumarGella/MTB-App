import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MovieCard Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const availableMovie = {
    _id: 'm1',
    movieName: 'Avatar',
    theatreName: 'PVR',
    availableTickets: 50,
    status: 'AVAILABLE',
  };

  const soldOutMovie = {
    _id: 'm2',
    movieName: 'Inception',
    theatreName: 'Inox',
    availableTickets: 0,
    status: 'SOLD_OUT',
  };

  test('renders movie details correctly', () => {
    render(<MovieCard movie={availableMovie} />, { wrapper: BrowserRouter });

    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('PVR')).toBeInTheDocument();
    expect(screen.getByText(/✔ Available: 50/)).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument(); // gets StatusText
  });

  test('button is enabled when movie is available', () => {
    render(<MovieCard movie={availableMovie} />, { wrapper: BrowserRouter });
    
    const btn = screen.getByRole('button', { name: /Book Now/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
    
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/book/m1');
  });

  test('button is disabled and shows Sold Out when movie is SOLD_OUT', () => {
    render(<MovieCard movie={soldOutMovie} />, { wrapper: BrowserRouter });

    expect(screen.getByText('SOLD OUT')).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /Sold Out/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();

    fireEvent.click(btn);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
