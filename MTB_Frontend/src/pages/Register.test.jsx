import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';
import api from '../api/axiosInstance';
import userEvent from '@testing-library/user-event';

// Mock useNavigate and api
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../api/axiosInstance');

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('renders all input fields', () => {
    render(<Register />, { wrapper: BrowserRouter });

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Login ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact Number')).toBeInTheDocument();
  });

  test('validates password constraints dynamically', async () => {
    render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const pwdInput = screen.getByPlaceholderText('Password');

    // Initially fails
    expect(screen.getByText('- Minimum 8 characters')).toHaveClass('req-fail');

    // Type valid password
    await user.type(pwdInput, 'Password@123');

    expect(screen.getByText('- Minimum 8 characters')).toHaveClass('req-pass');
    expect(screen.getByText('- Contains uppercase letter')).toHaveClass('req-pass');
    expect(screen.getByText('- Contains lowercase letter')).toHaveClass('req-pass');
    expect(screen.getByText('- Contains a number')).toHaveClass('req-pass');
    expect(screen.getByText('- Contains special character (!@#$%^&*)')).toHaveClass('req-pass');
  });

  test('shows alert if passwords do not match', async () => {
    render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@test.com');
    await user.type(screen.getByPlaceholderText('Login ID'), 'johnD');
    await user.type(screen.getByPlaceholderText('Password'), 'Password@123');
    await user.type(screen.getByPlaceholderText('Confirm Password'), 'Password@456');
    await user.type(screen.getByPlaceholderText('Contact Number'), '123456');

    const submitBtn = screen.getByRole('button', { name: /Register/i });
    await user.click(submitBtn);

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
    expect(api.post).not.toHaveBeenCalled();
  });

  test('calls API and navigates on successful registration', async () => {
    render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    api.post.mockResolvedValueOnce({ data: { message: 'Success' } });

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@test.com');
    await user.type(screen.getByPlaceholderText('Login ID'), 'johnD');
    await user.type(screen.getByPlaceholderText('Password'), 'Password@123');
    await user.type(screen.getByPlaceholderText('Confirm Password'), 'Password@123');
    await user.type(screen.getByPlaceholderText('Contact Number'), '123456');

    const submitBtn = screen.getByRole('button', { name: /Register/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', expect.any(Object));
      expect(window.alert).toHaveBeenCalledWith('Registration successful');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
