import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import UnauthenticatedApp from '../../components/UnauthenticatedApp';

jest.mock('../../firebase/setup', () => ({
    auth: {},
  }));

describe('UnauthenticatedApp', () => {
  test('renders the welcome header', () => {
    const { getByText } = render(<UnauthenticatedApp />);
    expect(getByText(/Welcome to ChatApp/i)).toBeInTheDocument();
  });

  test('shows login modal when login button is clicked', () => {
    const { getByText, getByTestId } = render(<UnauthenticatedApp />);
    const loginBtn = getByText('Log in');
    fireEvent.click(loginBtn);
    const loginModal = getByTestId('login-modal');
    expect(loginModal).toBeVisible();
  });

  test('shows signup modal when signup button is clicked', () => {
    const { getByText, getByTestId } = render(<UnauthenticatedApp />);
    const signupBtn = getByText('Sign up');
    fireEvent.click(signupBtn);
    const signupModal = getByTestId('signup-modal');
    expect(signupModal).toBeVisible();
  });
});
