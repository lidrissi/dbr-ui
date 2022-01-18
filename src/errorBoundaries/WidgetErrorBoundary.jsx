import React, { Component } from 'react'

export default class WidgetErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: '',
    }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error })
  }

  render() {
    const { hasError } = this.state
    // eslint-disable-next-line react/prop-types
    const { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      const path = window.location.href
      return (
        <div
          className="text-center"
          style={{ margin: '20px auto', overflow: 'auto' }}
        >
          <img
            // eslint-disable-next-line global-require
            src={require('assets/images/iconwrong.svg')}
            alt=""
            title=""
            style={{ width: '10%' }}
          />
          <h3 className="text-muted m-2">
            Désolé, une erreur innatendue s’est produite...{' '}
          </h3>
        </div>
      )
    }

    return children
  }
}
