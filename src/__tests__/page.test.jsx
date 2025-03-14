import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe } from 'node:test';
import Home from '../app/page';
import NewExercise from '../app/components/NewExercise';
import userEvent from '@testing-library/user-event';

describe('Exercices', () => {
    it('should display the tabs', () => {
        render(<Home />);
        expect(screen.getByText('Push')).toBeInTheDocument();
        expect(screen.getByText('Leg')).toBeInTheDocument();
        expect(screen.getByText('Pull')).toBeInTheDocument();
        expect(screen.getByText('Arms')).toBeInTheDocument();
        expect(screen.getByText('P + E')).toBeInTheDocument();
    });

    it('should add two new exercises', async () => {
        const user = userEvent.setup();
        render(<Home />);
        await user.click(screen.getByRole('button', { name: /Exercise/i }));
        const initialListOfExercises = screen.getAllByTestId(/exercise-/);
        expect(initialListOfExercises.length).toBe(1);
        await user.click(screen.getByRole('button', { name: /Exercise/i }));
        const updatedListOfExercises = screen.getAllByTestId(/exercise-/);
        expect(updatedListOfExercises.length).toBe(2);
    });

    it('should set isEdition mode', async () => {
        const user = userEvent.setup();
        render(<Home />);
        await user.click(screen.getByTestId('isNotEdition0'));
        expect(screen.getByTestId("isEdition0")).toBeInTheDocument();
    })

    // it('should add new exercise', async () => {
    //     const user = userEvent.setup();
    //     render(<NewExercise />);
    //     const input = screen.getByTestId('nameInput');

    //     await user.type(input, ' World!')
    //     console.log(input);
    //     expect(input.querySelector('input').value).toBe(' World!')
    // })
});
