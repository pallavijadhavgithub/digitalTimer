// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isCondition: false,
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearInterval()
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onDecrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  isReset = () => {
    this.setState({
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
      isCondition: false,
    })
    this.clearTimer()
  }

  onChangingState = () => {
    const {isCondition, timeElapsedInSeconds, timerLimitInMinutes} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    // console.log(isTimerCompleted)
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isCondition) {
      this.clearTimer()
    } else {
      this.intervalId = setInterval(() => {
        this.incrementTimeElapsedInSeconds()
      }, 1000)
    }

    this.setState(prevState => ({isCondition: !prevState.isCondition}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isCondition, timerLimitInMinutes} = this.state

    const icon = isCondition
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const iconState = isCondition ? 'Pause' : ' Start'
    const altText = isCondition ? 'pause icon' : 'play icon'
    const status = isCondition ? 'Running' : 'Paused'

    return (
      <div className="container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="both">
          <div className="image-container">
            <div className="middle-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="state">{status}</p>
            </div>
          </div>
          <div className="second-container">
            <div className="options-container">
              <div className="playing">
                <button
                  type="button"
                  className="change-button"
                  onClick={this.onChangingState}
                >
                  <img src={icon} alt={altText} className="start-stop" />

                  <p type="button" className="option">
                    {iconState}
                  </p>
                </button>
              </div>
              <div className="playing">
                <button type="button" className="change-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="start-stop"
                    onClick={this.isReset}
                  />
                </button>
                <p className="option">Reset</p>
              </div>
            </div>
            <p className="description">Set Timer Limit</p>
            <div className="button-container">
              <button
                className="button"
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="timer">{timerLimitInMinutes}</p>
              <button
                className="button"
                type="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
