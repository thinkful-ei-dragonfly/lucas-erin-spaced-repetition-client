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
      <section className='registrationRoute'>
        <h2>Sign up</h2>
        <h3 className='sub-tagline'>Apprendere is a web app that will help you learn Italian in no time. Eccezionale!</h3>
        <p className="sign-up">Practice learning a language with the spaced reptition revision technique.</p>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
