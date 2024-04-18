import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteGameModal from "../components/game-delete/DeleteGameModal";

describe('DeleteGameModal component', () => {
    test('renders properly', () => {
        const onCancelButton = jest.fn();
        const onDeleteButton = jest.fn();
        render(<DeleteGameModal onCancelButton={onCancelButton} onDeleteButton={onDeleteButton} />);

        expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    test('check cancel button', () => {
        const onCancelButton = jest.fn();
        const onDeleteButton = jest.fn();
        render(<DeleteGameModal onCancelButton={onCancelButton} onDeleteButton={onDeleteButton} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(onCancelButton).toHaveBeenCalledTimes(1);
        expect(onDeleteButton).not.toHaveBeenCalled();
    });

    test('check delete button', () => {
        const onCancelButton = jest.fn();
        const onDeleteButton = jest.fn();
        render(<DeleteGameModal onCancelButton={onCancelButton} onDeleteButton={onDeleteButton} />);

        fireEvent.click(screen.getByText('Delete'));

        expect(onDeleteButton).toHaveBeenCalledTimes(1);
        expect(onCancelButton).not.toHaveBeenCalled();
    });
});
