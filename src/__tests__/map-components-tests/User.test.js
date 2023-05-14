import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import User from '../../components/map-components/User';

describe('User component', () => {
  const mockUser = {
    fullName: 'John Doe',
    photoURL: 'https://example.com/photo.jpg',
    uid: 'user-id',
  };
  const mockSetUserId = jest.fn();
  const mockDialogRef = { current: { style: { display: '' } } };

  test('renders user name and profile picture', () => {
    const { getByText, getByRole } = render(
      <User user={mockUser} setUserId={mockSetUserId} dialogRef={mockDialogRef} />
    );
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  test('calls setUserId and shows dialog on click', () => {
    const { getByText } = render(
      <User user={mockUser} setUserId={mockSetUserId} dialogRef={mockDialogRef} />
    );
    fireEvent.click(getByText('John Doe'));
    expect(mockSetUserId).toHaveBeenCalledWith('user-id');
    expect(mockDialogRef.current.style.display).toBe('block');
  });
});
