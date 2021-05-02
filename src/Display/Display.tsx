import React from 'react';
//import styles from './Display.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

type displayProps = {
  histCur: {
    base: string,
    target: string
  }[],
}

class Display extends React.Component<{ displayprops: displayProps }, {}> {
  constructor(props: any) {
    super(props);
    this.state = {};
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
                    <h5>{this.props.displayprops.histCur[0].base + ' ='}</h5>
                  </Col>
                  <Col xs="auto" lg="8" className="text-right">
                    <h1 title="Desired Amount" className="display-4 font-weight-normal">{
                      this.props.displayprops.histCur[0].target
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
