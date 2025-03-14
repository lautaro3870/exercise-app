import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import Home from '../app/page';
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
    expect(screen.getByTestId('isEdition0')).toBeInTheDocument();
  });

  it('should add new exercise completing the inputs', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const inputName = screen.getByTestId('nameInput');
    const inputWeigth = screen.getByTestId('weightInput');

    await user.type(inputName, 'Sentadilla');
    await user.type(inputWeigth, '100');
    expect(inputName.querySelector('input').value).toBe('Sentadilla');
    expect(inputWeigth.querySelector('input').value).toBe('100');
  });
});
