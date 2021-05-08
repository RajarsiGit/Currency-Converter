import React from 'react';
//import styles from './Display.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

type displayProps = {
  base: string,
  target: string
}

type displayState = {
  base: string,
  target: string
}

class Display extends React.Component<{ displayprops: displayProps }, { displaystate: displayState }> {
  constructor(props: { displayprops: displayProps; }) {
    super(props);
    this.state = {
      displaystate: {
        base: this.props.displayprops.base,
        target: this.props.displayprops.target
      }
    };
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center pt-4 mb-5">
          <Col xs="12" lg="10">
            <Jumbotron>
              <Container fluid>
                <Row className="align-items-end justify-content-end">
                  <Col xs="12" lg="4" className="text-left">
                    <h5>{(this.state.displaystate.base || '1.0000 AED') + ' ='}</h5>
                  </Col>
                  <Col xs="auto" lg="8" className="text-right">
                    <h1 title="Desired Amount" className="display-4 font-weight-normal">{
                      this.state.displaystate.target || '1.0000 AED'
                    }</h1>
                  </Col>
                </Row>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Display;
