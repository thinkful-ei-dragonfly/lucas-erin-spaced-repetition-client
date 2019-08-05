import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section>
        <h2 className="tagline">
          Practice learning Italian with the spaced reptition revision technique.
        </h2>
        <h3 className='sub-tagline'>Apprendere is a web app that will help you learn Italian in no time. Eccezionale!</h3>
        <h4 className="sign-up">Sign up</h4>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
