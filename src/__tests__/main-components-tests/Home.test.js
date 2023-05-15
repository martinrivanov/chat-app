import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from '../../components/Home';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('../../firebase/setup', () => ({
  auth: {},
}));

jest.mock('../../components/AuthenticatedApp', () => ({
  __esModule: true,
  default: () => 'AuthenticatedApp',
}));

jest.mock('../../components/UnauthenticatedApp', () => ({
  __esModule: true,
  default: () => 'UnauthenticatedApp',
}));

describe('Home', () => {
  test('renders UnauthenticatedApp when user is not authenticated', () => {
    useAuthState.mockReturnValue([null]);
    const { container } = render(<Home />);
    expect(container).toHaveTextContent('UnauthenticatedApp');
  });

  test('renders AuthenticatedApp when user is authenticated and has displayName', () => {
    const user = { displayName: 'John Doe' };
    useAuthState.mockReturnValue([user]);
    const { container } = render(<Home />);
    expect(container).toHaveTextContent('AuthenticatedApp');
  });

  test('renders UnauthenticatedApp when user is authenticated but has no displayName', () => {
    const user = {};
    useAuthState.mockReturnValue([user]);
    const { container } = render(<Home />);
    expect(container).toHaveTextContent('UnauthenticatedApp');
  });
});
