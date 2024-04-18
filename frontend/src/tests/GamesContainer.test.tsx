import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GamesContainer from "../components/game-list/GamesContainer";

describe('GamesContainer component', () => {
    const mockGameData = [
        {
            id: 1,
            title: 'Test Game 1',
            releaseYear: 2022,
            description: 'This is a test game 1',
            genres: ['Action', 'Adventure'],
            rating: 4.5,
            image: 'test1.jpg',
        },
        {
            id: 2,
            title: 'Test Game 2',
            releaseYear: 2023,
            description: 'This is a test game 2',
            genres: ['RPG'],
            rating: 3.8,
            image: 'test2.jpg',
        },
    ];

    const mockOnDeleteButton = jest.fn();
    const mockOnUpdateButton = jest.fn();

    test('renders game details correctly', () => {
        render(
            <GamesContainer
                list={mockGameData}
                onDeleteButton={mockOnDeleteButton}
                onUpdateButton={mockOnUpdateButton}
            />
        );

        const gameElements = screen.getAllByTestId('game');
        expect(gameElements.length).toBe(mockGameData.length);

        gameElements.forEach((gameElement, index) => {
            const game = mockGameData[index];
            expect(gameElement).toHaveTextContent(game.title);
            expect(gameElement).toHaveTextContent(game.releaseYear.toString());
            expect(gameElement).toHaveTextContent(game.description);
            expect(gameElement).toHaveTextContent(`Genres: ${game.genres.join(', ')}`);
            expect(gameElement).toHaveTextContent(game.rating.toString());
        });
    });


    test('calls onUpdateButton when edit button is clicked', () => {
        render(
            <GamesContainer
                list={mockGameData}
                onDeleteButton={mockOnDeleteButton}
                onUpdateButton={mockOnUpdateButton}
            />
        );

        const editButtons = screen.getAllByTestId('edit-button');
        editButtons.forEach((editButton, index) => {
            fireEvent.click(editButton);
            expect(mockOnUpdateButton).toHaveBeenCalledWith(mockGameData[index]);
        });
    });
});