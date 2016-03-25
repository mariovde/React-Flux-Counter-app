import React from 'react';
import Counter from '../counter/Counter';
import TopicsList from '../topicsList/TopicsList';

class Countdown extends React.Component {
  render() {
    return (
        <div className="container-fluid">
          <Counter minutes={30} seconds={0} milliseconds={0}/>
          <TopicsList />
        </div>
    );
  }
}

export default Countdown;
