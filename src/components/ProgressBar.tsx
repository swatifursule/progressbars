import React from 'react'
import styled from 'styled-components'

interface MyProps {
  percent: number
  limit: number
}
interface MyWrapperProps {
  limit: number
}
const ProgBarWrapper = styled.div`
  margin: 30px;
  border: 2px solid lightgrey;
  height: 30px;
  width: 100%;
`

const ProgBar = styled.div`
  background: ${(props: MyProps) => (props.percent > props.limit ? 'red' : 'lightblue')};
  height: 100%;
  margin-top: -18px;
  max-width: ${(props: MyProps) =>
    props.percent < 0 ? 0 : props.percent > props.limit ? props.limit : props.percent}%;
`

export const ProgressBar = (props: any) => {
  return (
    <ProgBarWrapper>
      <span>{props.percent >= 0 ? `${props.percent}%` : ''}</span>
      <ProgBar percent={props.percent} limit={props.limit} />
    </ProgBarWrapper>
  )
}
