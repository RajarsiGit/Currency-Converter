import React from 'react';
import styles from './Root.module.css';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Display from '../Display/Display';
import AppForm from '../Form/Form';
import Conversion from '../Conversion/Conversion';
import Banner from '../Banner/Banner';
import Ribbon from '../Ribbon/Ribbon';
import Footer from '../Footer/Footer';
import History from '../History/History';

type rootState = {
  baseCur: string,
  targetCur: string,
  amount: string,
  conAmount: string,
  histCur: {
    base: string,
    target: string
  }[]
}

class Root extends React.Component<{}, { roostate: rootState }> {
  rootRef!: {
    spinnerRef: any;
  }
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {
      roostate: {
        baseCur: 'AED',
        targetCur: 'AED',
        amount: '1.0000',
        conAmount: '1.0000',
        histCur: [{
          base: '',
          target: '',
        }, {
          base: '',
          target: '',
        }, {
          base: '',
          target: '',
        }, {
          base: '',
          target: '',
        }]
      }
    };
    this.rootRef = {
      spinnerRef: null
    }
  }

  process = (state: any) => {
    Conversion(({amount, value}) => {
      this.setState({
        roostate: {
          baseCur: state.baseCur,
          targetCur: state.targetCur,
          amount: state.amount,
          conAmount: amount,
          histCur: [{
            base: '1.0000 ' + state.baseCur,
            target: value + ' ' + state.targetCur
          }, {
            base: this.state.roostate.histCur[0].base,
            target: this.state.roostate.histCur[0].target
          }, {
            base: this.state.roostate.histCur[1].base,
            target: this.state.roostate.histCur[1].target
          }, {
            base: this.state.roostate.histCur[2].base,
            target: this.state.roostate.histCur[2].target
          }]
        }
      });
    }, state.baseCur, state.targetCur, state.amount);
  }

  handleLoad = () => {
    setTimeout(() => {
      this.rootRef.spinnerRef.style.opacity = '0';
    }, 1);
    setTimeout(() => {
      this.rootRef.spinnerRef.style.display = 'none';
    }, 700);
  }

  componentDidMount = () => {
    window.addEventListener('load', this.handleLoad);
 }

  render() {
    return (  
      <div>
        <div ref={(e: any) => this.rootRef.spinnerRef = e} className={styles.Spinner}>
          <Container>
            <Row className="justify-content-center">
              <Col xs="auto" lg="auto" className="d-flex align-items-center">
                <Spinner animation="border" variant="primary" />
              </Col>
            </Row>
          </Container>
        </div>
        <Ribbon />
        <Banner />
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" lg="8">
              <Card style={{margin: '1em auto'}}>
                <Card.Body>
                  <Card.Title style={{fontSize: '2rem'}}>Convert Your Currency Now</Card.Title>
                    <hr />
                    <Display conAmount={this.state.roostate.conAmount}/>
                    <AppForm process={this.process} state={this.state.roostate}/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" lg="8">
              <Card style={{margin: '1em auto'}}>
                <Card.Body>
                  <Card.Title style={{fontSize: '2rem', }}>Used Conversions</Card.Title>
                    <hr />
                    <History histcur={this.state.roostate.histCur} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Root;
