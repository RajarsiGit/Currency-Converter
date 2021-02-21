import React from 'react';
//import styles from './History.module.css';
import { Container, Row, Col, Table } from 'react-bootstrap';

type HistCur = {
  base: string,
  target: string
}

class History extends React.Component<{histcur: HistCur[]}, {}> {
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center pt-4 pb-5">
          <Col xs="12" lg="12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Base Currency</th>
                <th>Target Currency</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.histcur.map((item, index) => {
                  if (item.base !== '' && item.target !== '') {
                    return [
                      <tr key={index.toString()}>
                        <td>{index + 1}</td>
                        <td>{item.base}</td>
                        <td>{item.target}</td>
                      </tr>
                    ];
                  } else {
                    return null;
                  }
                })
              }
            </tbody>
          </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default History;
