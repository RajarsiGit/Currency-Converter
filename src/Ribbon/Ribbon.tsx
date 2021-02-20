import React from 'react';
import styles from './Ribbon.module.css';
import { Container, Row, Col, Image } from 'react-bootstrap'

const Ribbon: React.FC = () => (
  <div className={styles.Ribbon}>
    <Container fluid>
      <Row>
        <Col xs="12" sm="10" lg="8">
          <div className={styles.Ribbontext}>
            Currency Converter Applicaton
          </div>
        </Col>
        <Col xs="auto" sm="2" lg="4">
          <Image src="logo192.png" className={styles.Ribbonlogo} />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Ribbon;
