import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  language: null,
  words: [],
  total_score: null,
  currentWord: {
    nextWord: "Testnextword",
    wordCorrectCount: 222,
    wordIncorrectCount: 333,
    totalScore: 999
  },
  guess: {
    userGuess: null,
    response: {
    nextWord: "test-next-word-from-incorrect-guess",
    wordCorrectCount: 888,
    wordIncorrectCount: 111,
    totalScore: 999,
    answer: "test-answer-from-incorrect-guess",
    isCorrect: false
    }
  },
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  setLanguage: () => {},
  setWords: () => {},
  setCurrentWord: () => {},
  setGuess: () => {},
  setScore: () => {}
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      error: null,
      words: [],
      language: null,
      total_score: 0,
      currentWord: {
        nextWord: "Italian word",
        wordCorrectCount: 222,
        wordIncorrectCount: 333,
        totalScore: 999
      },
      guess: {
        userGuess: null,
        response: {
        nextWord: "Italian word",
        wordCorrectCount: 888,
        wordIncorrectCount: 111,
        totalScore: 999,
        answer: "ANSWER",
        isCorrect: true
      }
    }
    }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setLanguage = language => {
    this.setState({ language })
  }

  setWords = words => {
    this.setState({ words })
  }

  setCurrentWord = currentWord => {
    this.setState({ currentWord })
  }

  setGuess = guess => {
    this.setState({ guess })
  }

  setScore = total_score => {
    this.setState({ total_score })
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
    IdleService.regiserIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
  }

  render() {
    const value = {
      user: this.state.user,
      language: this.state.language,
      words: this.state.words,
      currentWord:this.state.currentWord,
      guess: this.state.guess,
      total_score: this.state.total_score,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setCurrentWord: this.setCurrentWord,
      setGuess: this.setGuess,
      setScore: this.setScore,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
