import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddGame from "../components/game-add/AddGame";
describe('AddGame component', () => {
    test('renders Add Game title', () => {
        render(<AddGame onBackButton={() => {}} onSubmitButton={() => {}} />);
        expect(screen.getByText('Add a new game')).toBeInTheDocument();
    });

    test('validateTitle function', () => {
        render(<AddGame onBackButton={() => {}} onSubmitButton={() => {}} />);
        const titleInput = screen.getByLabelText('Title');
        fireEvent.change(titleInput, { target: { value: '' } });
        fireEvent.blur(titleInput);
        expect(screen.getByText('Title is required!')).toBeInTheDocument();
    });

    test('validateReleaseYear function', () => {
        render(<AddGame onBackButton={() => {}} onSubmitButton={() => {}} />);
        const releaseYearInput = screen.getByLabelText('Release Year');
        fireEvent.change(releaseYearInput, { target: { value: '' } });
        fireEvent.blur(releaseYearInput);
        expect(screen.getByText('Release year is required!')).toBeInTheDocument();

        fireEvent.change(releaseYearInput, { target: { value: 'abc' } });
        fireEvent.blur(releaseYearInput);
        expect(screen.getByText('Release year must be a number!')).toBeInTheDocument();
    });

    test('validateDescription function', () => {
        render(<AddGame onBackButton={() => {}} onSubmitButton={() => {}} />);
        const descriptionInput = screen.getByLabelText('Description');
        fireEvent.change(descriptionInput, { target: { value: '' } });
        fireEvent.blur(descriptionInput);
        expect(screen.getByText('Description is required!')).toBeInTheDocument();
    });


    test('validateRating function', () => {
        render(<AddGame onBackButton={() => {}} onSubmitButton={() => {}} />);
        const ratingInput = screen.getByLabelText('Rating');
        fireEvent.change(ratingInput, { target: { value: '' } });
        fireEvent.blur(ratingInput);
        expect(screen.getByText('Rating is required!')).toBeInTheDocument();

        fireEvent.change(ratingInput, { target: { value: 'abc' } });
        fireEvent.blur(ratingInput);
        expect(screen.getByText('Rating must be a number!')).toBeInTheDocument();
    });

    test('submitting the form with valid data', () => {
        const mockOnSubmitButton = jest.fn();
        const mockOnBackButton = jest.fn();
        render(<AddGame onBackButton={mockOnBackButton} onSubmitButton={mockOnSubmitButton} />);

        const titleInput = screen.getByLabelText('Title');
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });

        const releaseYearInput = screen.getByLabelText('Release Year');
        fireEvent.change(releaseYearInput, { target: { value: '2022' } });

        const descriptionInput = screen.getByLabelText('Description');
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        const genresInput = screen.getByLabelText('Genres');
        fireEvent.change(genresInput, { target: { value: 'Action,Adventure' } });

        const ratingInput = screen.getByLabelText('Rating');
        fireEvent.change(ratingInput, { target: { value: '8.5' } });

        const submitButton = screen.getByText('Add Game');
        fireEvent.click(submitButton);

        expect(mockOnSubmitButton).toHaveBeenCalledWith({
            id: 1,
            title: 'Test Title',
            description: 'Test Description',
            releaseYear: 2022,
            genres: ['Action', 'Adventure'],
            rating: 8.5,
            image: "placeholder.png"
        });

        expect(mockOnBackButton).toHaveBeenCalled();
    });
})
