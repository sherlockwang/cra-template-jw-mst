import { Component, ReactNode } from 'react'
import styled from 'styled-components'

const ErrorWrapper = styled.div`
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`
interface IProps {
  children: ReactNode
  message?: string
}

interface IState {
  hasError: boolean
  error?: object | null
}

class ErrorBoundary extends Component<IProps, IState> {
  public static defaultProps = {
    message: ' Request Error, please refresh to try again.',
  }

  public constructor(props: IProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  public static getDerivedStateFromError(_: Error): IState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
    })
    // You can also log error messages to an error reporting service here
  }

  private onRefresh = () => {
    location.reload()
  }

  public render() {
    if (this.state.hasError) {
      // Error path
      return (
        <ErrorWrapper className="error-boundary">
          <h2>
            <span>{this.props.message}</span>
          </h2>
          <button onClick={this.onRefresh}>Refresh</button>
          <details>
            <div className="error-info">{this.state.error && this.state.error.toString()}</div>
          </details>
        </ErrorWrapper>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary
