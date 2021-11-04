import React from 'react'
import styled from 'styled-components'

const CenterBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .cmp-center-box {
    font-weight: 700;
  }
`

interface IProps {
  style?: React.CSSProperties
  children: React.ReactNode
}

export default function CenterBox(
  { style = {}, children = null } = {} as IProps
): React.ReactElement {
  return (
    <CenterBoxWrapper style={style}>
      <div className="cmp-center-box">{children}</div>
    </CenterBoxWrapper>
  )
}
