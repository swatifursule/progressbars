import React from 'react'
import { render, getAllByLabelText } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

test('renders Progress Bar with percent', () => {
  const { getByText, container } = render(<ProgressBar percent={50} />)
  const linkElement = getByText(/50%/i)
  // console.log("linkElement ", linkElement)
  expect(linkElement).toBeInTheDocument()
  expect(container.firstChild?.nodeName).toEqual('DIV')
  expect(container.firstChild?.childNodes[0].nodeName).toEqual('SPAN')
  expect(container.firstChild?.childNodes[0].childNodes[0].textContent).toEqual('50%')
  // expect(container.firstChild?.childNodes[1].childNodes[0].nodeName).toEqual("DIV")
  // expect(container.firstChild?.childNodes[0].childNodes[1].textContent).toEqual("50%")
  // expect(container.firstChild?.childNodes[0].childNodes[0].childNodes.length).toEqual(2)
})

test('renders Progress Bar when percent is  0', () => {
  const { container } = render(<ProgressBar percent={0} />)
  // console.log("contaner ", container.firstChild, container.firstElementChild)
  const firstChild = container.firstChild
  expect(container.firstChild?.nodeName).toEqual('DIV')
  expect(container.firstChild?.childNodes[0].nodeName).toEqual('SPAN')
  expect(container.firstChild?.childNodes[0].childNodes[0].textContent).toEqual('0%')
})
test('renders Progress Bar when percent is less than 0', () => {
  const { container } = render(<ProgressBar percent={-25} />)
  // console.log("contaner ", container.firstChild, container.firstElementChild)
  const firstChild = container.firstChild
  expect(container.firstChild?.nodeName).toEqual('DIV')
  expect(container.firstChild?.childNodes[0].nodeName).toEqual('SPAN')
  expect(container.firstChild?.childNodes[0].childNodes.length).toEqual(0)
})

test('renders Progress Bar when percent is less than limit', () => {
  const { container } = render(<ProgressBar percent={55} limit={250} />)
  const firstChild = container.firstChild
  expect(container.firstChild?.nodeName).toEqual('DIV')
  expect(container.firstChild?.childNodes[0].nodeName).toEqual('SPAN')
  expect(container.firstChild?.childNodes[0].childNodes[0].textContent).toEqual('55%')
})

test('renders Progress Bar when percent is greater than limit', () => {
  const { container } = render(<ProgressBar percent={255} limit={250} />)
  const firstChild = container.firstChild
  expect(container.firstChild?.nodeName).toEqual('DIV')
  expect(container.firstChild?.childNodes[0].nodeName).toEqual('SPAN')
  expect(container.firstChild?.childNodes[0].childNodes[0].textContent).toEqual('255%')
})
