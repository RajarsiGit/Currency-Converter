import React from 'react';
//import styles from './Display.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

class Display extends React.Component<{conAmount: string}, {}> {
  constructor(props: any | Readonly<{}>) {
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
                  <Col xs="12" lg="5">
                    <h4>Target Amount</h4>
                  </Col>
                  <Col xs="auto" lg="7" className="text-right">
                    <h1 title="Desired Amount" className="display-4 font-weight-normal">{this.props.conAmount}</h1>
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
