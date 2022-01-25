import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error });
  }

  render() {
    const { hasError, error } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      const path = window.location.href;
      return (
        <div
          className="text-center"
          style={{ margin: "20px auto", overflow: "auto" }}
        >
          <img
            // eslint-disable-next-line global-require
            src={require("assets/images/iconwrong.svg")}
            alt=""
            title=""
            style={{ width: "10%" }}
          />
          <h3 className="text-muted m-2">
            Désolé, une erreur innatendue s’est produite...{" "}
          </h3>
          <h3>
            <strong>
              La version actuelle de votre navigateur internet n&apos;est pas
              supportée et peux causer des problèmes de navigation. Une mise à
              jour prends juste quelques secondes et fait disparaître ce message
              à jamais.
            </strong>
          </h3>
          {error && (
            <div className="jumbotron p-4">
              <div className="pb-2">
                <strong>
                  Si l&apos;erreur persiste, veuillez copier le message
                  ci-dessous, et l&apos;envoyer à cet e-mail: <b>D4R@um6p.ma</b>{" "}
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

          <a href="/app">
            <i className="zmdi zmdi-home mr-2" />
            Home
          </a>
        </div>
      );
    }

    return children;
  }
}
