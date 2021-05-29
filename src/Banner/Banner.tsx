import React, { createRef, RefObject } from 'react';
import styles from './Banner.module.css';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap'

class Banner extends React.Component<{}, {}> {
  bannerRefs!: {
    carItemRef1: RefObject<HTMLDivElement>;
    carItemRef2: RefObject<HTMLDivElement>;
    carItemRef3: RefObject<HTMLDivElement>;
  };

  constructor(props: {}) {
    super(props);

    this.bannerRefs = {
      carItemRef1: createRef(),
      carItemRef2: createRef(),
      carItemRef3: createRef(),
    }
  }

  render() {
    return (
      <div className={styles.Banner}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs="auto" lg="6" className="pt-3">
              <Carousel>
                <Carousel.Item ref={this.bannerRefs.carItemRef1}>
                  <Image src="banner1.webp" alt="Banner 1" height="316" width="734" fluid />
                </Carousel.Item>
                <Carousel.Item ref={this.bannerRefs.carItemRef2}>
                  <Image src="banner2.webp" alt="Banner 2" height="316" width="734" fluid />
                </Carousel.Item>
                <Carousel.Item ref={this.bannerRefs.carItemRef3}>
                  <Image src="banner3.webp" alt="Banner 3" height="316" width="734" fluid />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Banner;
