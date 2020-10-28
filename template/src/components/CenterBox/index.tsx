import React from 'react'
import './index.scss'

export default function CenterBox(props) {
  return (
    <div className="cmp-center-box--wrapper" style={props.style}>
      <div className="cmp-center-box">{props.children}</div>
    </div>
  )
}
