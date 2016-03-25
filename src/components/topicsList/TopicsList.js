import React from 'react';
import Topic from './topic/Topic';
import TopicStore from '../../stores/TopicStore';
import TopicActions from '../../actions/TopicActions';
import  ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TopicsList extends React.Component {

    _onTopicChange() {

        console.log("on topic change ") ;
        let topics = this.state.topics;
        topics.splice(0,1);
        this.setState({topics:topics});

        let topic = this.refs["topic" + TopicStore.getActiveTopicIndex()]; // class Topic;
        if (topic) {
            topic._setActive();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            topics: TopicStore.getTopics()
        }
    }

    componentDidMount() {
        this._onTopicChange = this._onTopicChange.bind(this);
        TopicStore.addChangeListener(this._onTopicChange);
    }

    render() {
        return (
            <div className="list-group">

                <ReactCSSTransitionGroup
                    className="animateExample"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                    transitionName="topics">

                {this.state.topics.map(function(topic) {
                    return <Topic key={topic.id} ref={'topic'+topic.id}
                                  title={topic.title}
                                  description={topic.description}
                                  thumbnail={topic.thumbnail}
                                  minutes={topic.minutes}
                                  seconds={topic.seconds}
                                  active={topic.active}/>
                })}

                </ReactCSSTransitionGroup>

            </div>
        );
    }
}

export default TopicsList;