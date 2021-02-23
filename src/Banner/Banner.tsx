import React from 'react';
import styles from './Banner.module.css';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap'

class Banner extends React.Component<{}, {}> {
  bannerRefs!: {
    carItemRef1: any;
    carItemRef2: any;
    carItemRef3: any;
  };

  constructor(props: any) {
    super(props);

    this.bannerRefs = {
      carItemRef1: null,
      carItemRef2: null,
      carItemRef3: null,
    }
  }

  render() {
    return (
      <div className={styles.Banner}>
        <Container>
          <Row className="justify-content-center">
            <Col xs="auto" lg="8" className="pt-3">
              <Carousel>
                <Carousel.Item ref={(e: any) => this.bannerRefs.carItemRef1 = e}>
                  <Image src="banner1.jpg" fluid />
                </Carousel.Item>
                <Carousel.Item ref={(e: any) => this.bannerRefs.carItemRef2 = e}>
                  <Image src="banner2.jpg" fluid />
                </Carousel.Item>
                <Carousel.Item ref={(e: any) => this.bannerRefs.carItemRef3 = e}>
                  <Image src="banner3.jpg" fluid />
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
