import React from 'react';
import {render, screen, fireEvent, getAllByTestId, waitFor, getAllByText, getByText} from '@testing-library/react';
import Home from '../components/home/Home'; // Update the path
import { PageEnum } from '../components/Page.Operations';
import {
    sortDecreaseGamesByRating,
    sortDecreaseGamesByTitle,
    sortIncreaseGamesByRating,
    sortIncreaseGamesByTitle
} from "../components/Service";
import GenreBarChart from "../components/barchart/GenreBarChart"; // Make sure to import PageEnum


describe('Home component', () => {
    test('renders games list by default', () => {
        render(<Home/>);
        const addButton = screen.getByText('Add Game');
        expect(addButton).toBeInTheDocument();
    });

    test('adds a game', () => {
        render(<Home/>);
        const addButton = screen.getByText('Add Game');
        fireEvent.click(addButton);
        const submitButton = screen.getByText('Add Game');
        expect(submitButton).toBeInTheDocument();
    });
    

    test('navigates to add game page', () => {
        render(<Home/>);
        const addButton = screen.getByText('Add Game');
        fireEvent.click(addButton);
        const submitButton = screen.getByText('Add Game');
        expect(submitButton).toBeInTheDocument();
    });

    test('navigates to games list page', () => {
        render(<Home/>);
        const addButton = screen.getByText('Add Game');
        fireEvent.click(addButton);
        const backButton = screen.getByText('Back');
        fireEvent.click(backButton);
        const addButtonAfterNavigate = screen.getByText('Add Game');
        expect(addButtonAfterNavigate).toBeInTheDocument();
    });

    const mockGameData = [
        {
            id: 1,
            title: 'Alpha-Game',
            releaseYear: 2022,
            description: 'This is a test game 1',
            genres: ['Action', 'Adventure'],
            rating: 4.5,
            image: 'test1.jpg',
        },
        {
            id: 2,
            title: 'Beta-Game',
            releaseYear: 2023,
            description: 'This is a test game 2',
            genres: ['RPG'],
            rating: 3.8,
            image: 'test2.jpg',
        },
        {
            id: 3,
            title: 'Sigma-Game',
            releaseYear: 2023,
            description: 'This is a test game 3',
            genres: ['RPG'],
            rating: 5,
            image: 'test2.jpg',
        },
    ];

    test('handleSortOptionChanged - alphabetically decrease function', () => {
        render(<Home/>);

        const selectSortOptions = screen.getByTestId('sort-options');
        fireEvent.change(selectSortOptions, { target: { value: 'alphabetically-decrease' } });
        const sortedGameTitles = sortDecreaseGamesByTitle(mockGameData).map(game => game.title);
        expect(sortedGameTitles).toEqual(["Sigma-Game", "Beta-Game", "Alpha-Game"]);
    });

    test('handleSortOptionChanged - alphabetically increase function', () => {
        render(<Home/>);

        const selectSortOptions = screen.getByTestId('sort-options');
        fireEvent.change(selectSortOptions, { target: { value: 'alphabetically-increase' } });
        const sortedGameTitles = sortIncreaseGamesByTitle(mockGameData).map(game => game.title);
        expect(sortedGameTitles).toEqual(["Alpha-Game", "Beta-Game", "Sigma-Game"]);
    });
    test('handleSortOptionChanged - rating increase function', () => {
        render(<Home/>);

        const selectSortOptions = screen.getByTestId('sort-options');
        fireEvent.change(selectSortOptions, { target: { value: 'rating-increase' } });
        const sortedGameTitles = sortIncreaseGamesByRating(mockGameData).map(game => game.rating);
        expect(sortedGameTitles).toEqual([3.8, 4.5, 5]);
    });
    test('handleSortOptionChanged - rating decrease function', () => {
        render(<Home/>);

        const selectSortOptions = screen.getByTestId('sort-options');
        fireEvent.change(selectSortOptions, { target: { value: 'rating-decrease' } });
        const sortedGameTitles = sortDecreaseGamesByRating(mockGameData).map(game => game.rating);
        expect(sortedGameTitles).toEqual([5, 4.5, 3.8]);
    });

    const mockGameList = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `game ${i + 1}`,
        genres: ['Action'],
    }));
    test('pagination', () => {
        render(<Home/>)
        expect(screen.getByText("Steins Gate")).toBeInTheDocument();
        const nextButton = screen.getByText("Next");
        fireEvent.click(nextButton);
        expect(screen.getByText("idk")).toBeInTheDocument();
        const previousButton = screen.getByText("Previous");
        fireEvent.click(previousButton);
        expect(screen.getByText("Steins Gate")).toBeInTheDocument();

    });


})