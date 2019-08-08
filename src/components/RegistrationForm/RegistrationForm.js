import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import ArrowRight from '../App/arrow-forward.svg'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target

    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form id="registration-box"
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <fieldset name='name-fields'className='input-row'>
            <img src={ArrowRight} alt='ArrowRight'/>
            <Label htmlFor='registration-name-input'>
              Enter your name<Required />
            </Label>
            <Input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              tabIndex='0'
              required
            />
        </fieldset>

          <fieldset
            name='username-fields'
            className='input-row'>
            <img src={ArrowRight} alt='ArrowRight'/>
            <Label htmlFor='registration-username-input'>
              Choose a username<Required />
            </Label>
            <Input
              id='registration-username-input'
              name='username'
              tabIndex='0'
              required
            />
        </fieldset>
          <fieldset
            name='password-fields'
            className='input-row'>
            <img src={ArrowRight} alt='ArrowRight'/>
            <Label htmlFor='registration-password-input'>
              Choose a password<Required />
            </Label>
            <Input
              id='registration-password-input'
              name='password'
              type='password'
              tabIndex='0'
              required
            />
        </fieldset>

        <footer>
          <Button type='submit'>
            Sign up
          </Button>
          {' '}
          <Link to='/login' className="login-link">Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
