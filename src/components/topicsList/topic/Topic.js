import React from 'react';
import TimerStore from '../../../stores/TimerStore';
import TopicActions from '../../../actions/TopicActions';
import TimerUtils from '../../../utils/TimerUtils';
import {Image} from 'react-bootstrap';

require('./_topic.scss');

class Topic extends React.Component {

  constructor(props) {
    super(props);
    let totalSeconds = (this.props.minutes * 60) + this.props.seconds;
    this.state = {
      totalTimeInSeconds: totalSeconds,
      time: TimerUtils.getFormatedTime(totalSeconds),
      elapsed: 0,
      active: this.props.active || false,
      completed:false
    };
  };

  _setActive() {
    this.setState({active: true});
  };


  _onTimerChange() {
    if (this.state.active) {
      this.state.elapsed += 1;
      let elapsed = this.state.totalTimeInSeconds - this.state.elapsed;
      if (elapsed === -1) {
        this.setState({active: false});
        this.setState({time: TimerUtils.getFormatedTime(0)});
        TopicActions.topicCompleted();
        this._removeListeners();
      }
      else {
        this.setState({time: TimerUtils.getFormatedTime(elapsed)});
      }
    }
  };

  componentWillUnmount() {
    this._removeListeners();
  };

  _removeListeners() {
    TimerStore.removeChangeListener(this._onTimerChange);
  };

  componentDidMount() {
    this._onTimerChange = this._onTimerChange.bind(this);
    TimerStore.addChangeListener(this._onTimerChange);
  };

  render() {
    return (

        <a className={"list-group-item "+(this.state.active ? 'active' : 'disabled')+' topic clearfix'}
           id={this.props.label}>
          <div className="topic__container">
            <div className="topic__thumbnail">
              <Image src={this.props.thumbnail} className="responsive thumbnail"/>
            </div>
            <div className="topic__description">
              <h1>{this.props.title}</h1>
              <p>{this.props.description}</p>
              <p className="time">{this.state.time}</p>
            </div>
          </div>

        </a>
    );
  };
}
export default Topic;
