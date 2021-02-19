import React from 'react';
import styles from './Banner.module.css';
import { Container, Row, Col, Image } from 'react-bootstrap'

const Banner: React.FC = () => (
  <div className={styles.Banner}>
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto" lg="8" className="pt-3">
          <Image src="banner.jpg" fluid />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Banner;
