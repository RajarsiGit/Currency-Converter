import React from 'react';
//import styles from './History.module.css';
import { Container, Row, Col, Table } from 'react-bootstrap';

type HistCur = {
  baseCur: string,
  targetCur: string
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
          <Col xs="10" lg="8">
          <Table striped borderless hover>
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
                  if (item.baseCur !== '' && item.targetCur !== '') {
                    return [
                      <tr key={index.toString()}>
                        <td>{index + 1}</td>
                        <td>{item.baseCur}</td>
                        <td>{item.targetCur}</td>
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
