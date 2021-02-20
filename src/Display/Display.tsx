import React from 'react';
//import styles from './Display.module.css';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

class Display extends React.Component<{conAmount: string}, {}> {
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center pt-4 pb-5">
          <Col xs="10" lg="4">
            <Form.Group controlId="Form.Display">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    Target Amount
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="input" title="Desired Amount" readOnly className="text-right" value={this.props.conAmount}></Form.Control>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Display;
