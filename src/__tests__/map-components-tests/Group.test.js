import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Group from '../../components/map-components/Group';

describe('Group', () => {
  test('renders a link with the group', () => {
    const groupDocs = {
      id: 'group-1',
      data: () => ({
        name: 'Public Group 1'
      })
    };
    render(
      <MemoryRouter>
        <Group groupDocs={groupDocs} />
      </MemoryRouter>
    );
    const groupLink = screen.getByRole('link');
    const groupName = groupLink.textContent;
    expect(groupLink).toHaveAttribute('href', '/group/group-1');
    expect(groupName).toBe('Public Group 1');
  });
});
