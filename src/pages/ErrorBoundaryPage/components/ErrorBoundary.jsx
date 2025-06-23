import React from 'react'

import Fallback from './Fallback'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Caught error in ErrorBoundary: ', error)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // reset error state e.g. if error happens on RecipePage
    // and pressing random-recipe should load/show data if there is no error
    if (prevState.hasError) {
      this.setState({hasError: false})
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Fallback />
    }

    return this.props.children
  }
}
