import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  message?: string
}

interface State {
  hasError: boolean
  error?: object | null
}

class ErrorBoundary extends Component<Props, State> {
  public static defaultProps = {
    message: '请求出错，请刷新页面重试',
  }

  public constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error) {
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
        <div className="error-boundary">
          <h2>
            <span>{this.props.message}</span>
          </h2>
          <button onClick={this.onRefresh}>刷新页面</button>
          <details>
            <div className="error-info">
              {this.state.error && this.state.error.toString()}
            </div>
          </details>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary