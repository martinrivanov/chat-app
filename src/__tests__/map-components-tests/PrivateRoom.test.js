import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PrivateRoom from '../../components/map-components/PrivateRoom';

jest.mock('../../firebase/setup', () => ({
  usersRef: {
    doc: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({
        data: () => ({
          photoURL: 'https://example.com/photo.jpg',
          fullName: 'John Doe'
        })
      }))
    }))
  }
}));

describe('PrivateRoom', () => {
  test('renders with user full name and photo', async () => {
    const mockRoom = { id: 'room-id', uidFirstUser: 'user1-id', uidSecondUser: 'user2-id' };
    const mockUser = { fullName: 'John Doe', photoURL: 'https://example.com/john-doe.jpg' };
    const mockUid = 'user1-id';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockUser,
    });

    render(
        <MemoryRouter>
            <PrivateRoom uid={mockUid} room={mockRoom} />
        </MemoryRouter>
    );
    const userFullName = screen.getByTestId('private-room-name');
    const userPhoto = screen.getByRole('img');
    expect(userFullName).toBeInTheDocument();
    expect(userPhoto).toBeInTheDocument();
  });
});
