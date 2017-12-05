import React from 'react';
import './Timer.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.disableToggle('restart', true)
  }

  tick = () => {
    this.setState({seconds: this.state.seconds + 1});
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  start = () => {
    this.disableToggle('start', true)
    this.timer = setInterval(this.tick, 1000);
  }

  pause = () => {
    clearInterval(this.timer);
    this.disableToggle('restart', false)
  }

  restart = () => {
    this.disableToggle('restart', true)
    this.timer = setInterval(this.tick, 1000);
  }

  reset = () => {
    clearInterval(this.timer);
    this.setState({seconds: 0});
    this.disableToggle('start', false)
    this.disableToggle('restart', true)
  }

  disableToggle = (className, boolean) => {
    document.getElementsByClassName(className)[0].disabled = boolean;
  }

  render() {
    return (
      <div className="timer">
        <h4>
          Уже прошло {this.state.seconds} секунд
        </h4>
        <button className="start" onClick={this.start}>Старт</button>
        <button className="pause" onClick={this.pause}>Пауза</button>
        <button className="restart" onClick={this.restart}>Возобновить</button>
        <button className="reset" onClick={this.reset}>Сбросить счетчик</button>
      </div>
    );
  }
}

export default Timer;
