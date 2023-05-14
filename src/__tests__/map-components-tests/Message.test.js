import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Message from '../../components/map-components/Message';

jest.mock('../../firebase/setup', () => {
  return {
    auth: {
      currentUser: {
        uid: '123'
      }
    },
    usersRef: {
      doc: jest.fn(() => {
        return {
          get: jest.fn(() => {
            return Promise.resolve({
              data: () => {
                return {
                  photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                };
              }
            });
          })
        };
      })
    }
  };
});

describe('Message', () => {
  test('renders message with content and user photo', async () => {
    const message = {
      content: 'Hello',
      uid: '123'
    };
    render(<Message message={message} />);
    const messageContent = screen.getByText('Hello');
    const messagePhoto = screen.getByRole('img');
    expect(messageContent).toBeInTheDocument();
    expect(messagePhoto).toBeInTheDocument();
  });
});

describe('Message', () => {
  test('renders the message as received', async () => {
    const message = {
      content: 'Hello',
      uid: '456'
    };
    render(<Message message={message} />);
    const messageData = screen.getByTestId('message');
    expect(messageData).toHaveClass("message received");
  });
});

describe('Message', () => {
  test('renders the message as sent', async () => {
    const message = {
      content: 'Hello',
      uid: '123'
    };
    render(<Message message={message} />);
    const messageData = screen.getByTestId('message');
    expect(messageData).toHaveClass("message sent");
  });
});