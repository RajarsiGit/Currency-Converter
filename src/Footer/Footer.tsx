import React from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap'

const Footer: React.FC = () => (
  <div className={styles.Footer}>
    <Container fluid>
      <Row>
        <Col xs="6" md="10" lg="10">
          <div className={styles.FootertextDesignby}>
            Design by:
          </div>
        </Col>
        <Col xs="6" md="2" lg="2">
          <div className={styles.FootertextName}>
            <a href="https://rajarsi.ml/">Rajarsi Saha</a>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
