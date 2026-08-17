import { render, screen, cleanup } from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import Card from '../components/Card.jsx'

afterEach(() => {
    cleanup();
});

test('Admin user sees the Delete button', () => {
    render(<Card title="Network Project" desc="Testing" role="admin" />);
    
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeDefined();
});

test('Standard user does not see the Delete button', () => {
    render(<Card title="Network Project" desc="Testing" role="user" />);
    
    const deleteButton = screen.queryByText('Delete');
    expect(deleteButton).toBeNull();
});