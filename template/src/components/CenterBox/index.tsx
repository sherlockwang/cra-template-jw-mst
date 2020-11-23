import './index.scss'

interface IProps {
  style: React.CSSProperties,
  children: React.ReactNode,
}

export default function CenterBox(props?: IProps): React.ReactElement {
  return (
    <div className="cmp-center-box--wrapper" style={props.style}>
      <div className="cmp-center-box">{props.children}</div>
    </div>
  )
}
