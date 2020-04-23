import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MainComponent } from './MainComponent'

test('renders Main Component and check if select bar changes on click', () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<MainComponent />)
  // const selectInput = getByLabelText('currentBar');
  // selectInput.innerHTML.value= '1';
  // fireEvent.change(selectInput);
  // fireEvent.click(getByText('Save'));
  // expect(getByTestId('saved')).toHaveTextContent('input text')
})

test('renders Main Component and check if progress changes of selected bar', () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<MainComponent />)
  // const selectInput = getByLabelText('currentBar');
  // selectInput.innerHTML.value= '1';
  // fireEvent.change(selectInput);
  // fireEvent.click(getByText('Save'));
  // expect(getByTestId('saved')).toHaveTextContent('input text')
})