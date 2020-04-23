import React, { useState, useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid lightgrey;
  margin: 0 0.5em;
  padding: 0.25em 0.5em;
  transition: 0.5s all
  /*
  Remove default focus styles for mouse users ONLY if
  :focus-visible is supported on this platform.
  */
  :focus {
    border: 2px solid lightgrey;
    outline: 0
  }
  `

const Select = styled.select`
  width: 70%;
  height: 35px;
  background: white;
  color: black;
  font-size: 16px;
  border: 2px solid lightgrey;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 1px 4px;
  }
`

function getWidthString(span: number) {
  if (!span) return
  const width = (span / 12) * 100
  return `width: ${width}%`
}

const Row = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`
interface SpanProps {
  xs?: number
  sm: number
  md: number
  lg: number
}

const Column = styled.div`
  float: left;
  ${(props: SpanProps) => (props.xs ? getWidthString(props.xs) : 'width: 90%')};

  @media only screen and (min-width: 768px) {
    ${(props: SpanProps) => props.sm && getWidthString(props.sm)};
  }
  @media only screen and (min-width: 992) {
    ${(props: SpanProps) => props.md && getWidthString(props.md)};
  }
  @media only screen and (min-width: 1200) {
    ${(props: SpanProps) => props.lg && getWidthString(props.lg)};
  }
`
export const MainComponent = () => {
  // const [error, setError] = useState({message: ''});
  const [isLoaded, setIsLoaded] = useState(false)
  const [bars, setBars] = useState([])
  const [buttons, setButtons] = useState([])
  const [limit, setLimit] = useState(100)
  const [currentBar, setCurrentBar] = useState(0)

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch('http://pb-api.herokuapp.com/bars')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setBars(result.bars)
          setButtons(result.buttons)
          setLimit(result.limit)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          // setError(error);
        }
      )
  }, [])

  // if (error) {
  //  return <div>Error: {error.message}</div>;
  // } else
  if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Row>
        <Row>
          <Column sm={4} md={4} lg={4} />
          <Column sm={4} md={4} lg={4}>
            {' '}
            <h1> Progress Bars Demo</h1>
          </Column>
          <Column sm={4} md={4} lg={4} />
        </Row>
        <Row>
          <Column sm={4} md={4} lg={4} />
          <Column sm={8} md={8} lg={8}>
            {bars.map((b: any, index: number) => {
              return <ProgressBar key={`bar_${index}`} percent={b} limit={limit} />
            })}
          </Column>
          <Column sm={2} md={2} lg={2} />
        </Row>
        <Row>
          <Column xs={2} sm={2} md={2} lg={2} />
          <Column xs={4} sm={4} md={4} lg={4}>
            <label style={{ display: 'none' }} htmlFor="currentBar">
              Change text
            </label>
            <Select
              id="currentBar"
              onChange={(event: any) => {
                setCurrentBar(event.target.value)
              }}
            >
              {bars.map((b: any, index: number) => (
                <option key={`option_${index}`} value={index}>
                  #progress{index + 1}
                </option>
              ))}
            </Select>
          </Column>
          <Column xs={6} sm={6} md={6} lg={6}>
            {buttons.map((b: any) => {
              const newArr = [...bars] // copying the old bars array
              // @ts-ignore
              newArr[currentBar] = newArr[currentBar] + b // replace e.target.value with whatever you want to change it to
              return (
                <Button
                  key={`btn_${b}`}
                  onClick={() => {
                    setBars(newArr)
                  }}
                >
                  {' '}
                  {b}{' '}
                </Button>
              )
            })}
          </Column>
        </Row>
      </Row>
    )
  }
}
