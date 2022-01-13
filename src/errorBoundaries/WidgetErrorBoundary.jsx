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
    const { hasError, error } = this.state
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
          {error && (
            <div className="jumbotron p-4">
              <div className="pb-2">
                <strong>
                  Si l&apos;erreur persiste, veuillez copier le message
                  ci-dessous, et l&apos;envoyer à cet e-mail: <b>D4R@um6p.ma</b>{' '}
                </strong>
              </div>
              <div>
                path of the error : {path}
                <br />
                {error.stack && error.stack.toString()}
              </div>
              <br />
            </div>
          )}
        </div>
      )
    }

    return children
  }
}
