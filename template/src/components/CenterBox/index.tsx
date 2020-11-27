import './index.scss'

interface IProps {
  style: React.CSSProperties
  children: React.ReactNode
}

export default function CenterBox({ style = {}, children = null } = {} as IProps): React.ReactElement {
  return (
    <div className="cmp-center-box--wrapper" style={style}>
      <div className="cmp-center-box">{children}</div>
    </div>
  )
}
