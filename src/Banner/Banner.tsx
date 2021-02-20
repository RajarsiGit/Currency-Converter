import React from 'react';
import styles from './Banner.module.css';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap'

const Banner: React.FC = () => (
  <div className={styles.Banner}>
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto" lg="8" className="pt-3">
          <Carousel>
            <Carousel.Item>
              <Image src="banner1.jpg" fluid />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="banner2.jpg" fluid />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="banner3.jpg" fluid />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Banner;
