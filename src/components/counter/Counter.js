import React from 'react';
import TimerActions from "../../actions/TimerActions";
import TimerStore from '../../stores/TimerStore';

require('./_counter.scss');

class Counter extends React.Component {
    _onChange() {
        this.setState({timeOutput: TimerStore.getFormatedTime()});
    };

    constructor(props) {
        super(props);
        this.state = {timeOutput: ""};

    }

    componentDidMount() {
        this._onChange = this._onChange.bind(this);
        this.setState({timeOutput: TimerStore.getFormatedTime()});
        TimerStore.addChangeListener(this._onChange);
        let timeProperties = {
            totalTimeInSeconds: (this.props.minutes * 60) + this.props.seconds,
            interval: 1000
        };
        if (!TimerStore.getIsPlaying()) {
            TimerActions.timerStarted(timeProperties); // 1000 interval
        }
    }

    componentWillUnmount() {
        TimerStore.removeChangeListener(this._onChange);
    };

    render() {
        return (

            <div className="counter">
                {this.state.timeOutput}
            </div>
        );
    };
}


export default Counter;