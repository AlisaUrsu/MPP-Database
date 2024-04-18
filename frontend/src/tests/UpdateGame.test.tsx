import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateGame from "../components/game-update/UpdateGame";

describe('UpdateGame component', () => {
    const mockGameData = {
        id: 1,
        title: 'Test Game',
        releaseYear: 2022,
        description: 'This is a test game',
        genres: ['Action', 'Adventure'],
        rating: 4.5,
        image: 'test.jpg',
    };

    test('renders Update Game title', () => {
        render(
            <UpdateGame
                data={mockGameData}
                onBackButton={() => {}}
                onUpdateButton={() => {}}
            />
        );
        expect(screen.getByText('Update game')).toBeInTheDocument();
    });

    test('validateTitle function', () => {
        render(
            <UpdateGame
                data={mockGameData}
                onBackButton={() => {}}
                onUpdateButton={() => {}}
            />
        );
        const titleInput = screen.getByLabelText('Title');
        fireEvent.change(titleInput, { target: { value: '' } });
        fireEvent.blur(titleInput);
        expect(screen.getByText('Title is required!')).toBeInTheDocument();
    });

    test('validateReleaseYear function', () => {
        render(
            <UpdateGame
                data={mockGameData}
                onBackButton={() => {}}
                onUpdateButton={() => {}}
            />
        );
        const releaseYearInput = screen.getByLabelText('Release Year');
        fireEvent.change(releaseYearInput, { target: { value: '' } });
        fireEvent.blur(releaseYearInput);
        expect(screen.getByText('Release year is required!')).toBeInTheDocument();

        fireEvent.change(releaseYearInput, { target: { value: 'abc' } });
        fireEvent.blur(releaseYearInput);
        expect(screen.getByText('Release year must be a number!')).toBeInTheDocument();
    });

    test('validateDescription function', () => {
        render(
            <UpdateGame
                data={mockGameData}
                onBackButton={() => {}}
                onUpdateButton={() => {}}
            />
        );
        const descriptionInput = screen.getByLabelText('Description');
        fireEvent.change(descriptionInput, { target: { value: '' } });
        fireEvent.blur(descriptionInput);
        expect(screen.getByText('Description is required!')).toBeInTheDocument();
    });


    test('validateRating function', () => {
        render(
            <UpdateGame
                data={mockGameData}
                onBackButton={() => {}}
                onUpdateButton={() => {}}
            />
        );
        const ratingInput = screen.getByLabelText('Rating');
        fireEvent.change(ratingInput, { target: { value: '' } });
        fireEvent.blur(ratingInput);
        expect(screen.getByText('Rating is required!')).toBeInTheDocument();

        fireEvent.change(ratingInput, { target: { value: 'abc' } });
        fireEvent.blur(ratingInput);
        expect(screen.getByText('Rating must be a number!')).toBeInTheDocument();
    });


});
