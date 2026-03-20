import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Movies from './Movies';
import api from '../api/axiosInstance';
import userEvent from '@testing-library/user-event';

jest.mock('../api/axiosInstance');

const mockMovies = [
  { _id: '1', movieName: 'Avatar', theatreName: 'PVR', availableTickets: 50, status: 'AVAILABLE' },
  { _id: '2', movieName: 'Inception', theatreName: 'Inox', availableTickets: 0, status: 'SOLD_OUT' }
];

describe('Movies Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders movies and handles searching', async () => {
    api.get.mockResolvedValueOnce({ data: { movies: mockMovies } });
    
    render(<Movies />, { wrapper: BrowserRouter });

    // Ensure api was called
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/movies');
    });

    // Verify movies are rendered
    expect(await screen.findByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');
    const user = userEvent.setup();

    // Type in the search box
    await user.type(searchInput, 'Ava');

    // Inception should disappear, Avatar should still be there
    expect(screen.queryByText('Inception')).not.toBeInTheDocument();
    expect(screen.getByText('Avatar')).toBeInTheDocument();
  });

  test('displays no movies found message when search matches none', async () => {
    api.get.mockResolvedValueOnce({ data: { movies: mockMovies } });
    const user = userEvent.setup();
    
    render(<Movies />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText('Avatar')).toBeInTheDocument();
    });

    await user.type(screen.getByRole('textbox'), 'Zebra');

    expect(screen.queryByText('Avatar')).not.toBeInTheDocument();
    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });
});
