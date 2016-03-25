import React from 'react';
import {PageHeader} from 'react-bootstrap';

class Introduction extends React.Component {
  render() {
    return (
        <div className="container">
          <PageHeader>Set up a frontend in 30 minutes.</PageHeader>
          <p className="lead">
              Welkom, jullie <strong>awesome</strong> developers, geïnteresseerden, sympathisanten...
              <br/>
              De introductie gaat ongeveer een kleine 10 minuutjes duren.
              <br/>
              Dan beginnen we aan het serieuzere werk.
              <br/>
              I promise.
              <br/>


          </p>
        </div>
    );
  }
}
export default Introduction;
