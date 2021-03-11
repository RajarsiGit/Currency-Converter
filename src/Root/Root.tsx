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
import { db, getData } from '../Conversion/dbHandler'

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
          target: ''
        }]
      }
    };
    this.rootRef = {
      spinnerRef: null
    }
  }

  process = (state: any) => {
    Conversion(({amount}) => {
      getData(db)
      .then((data) => {
        this.setState({
          roostate: {
            baseCur: state.baseCur,
            targetCur: state.targetCur,
            amount: state.amount,
            conAmount: amount,
            histCur: data
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
    }, state.baseCur, state.targetCur, state.amount);
  }

  handleLoad = () => {
    getData(db)
    .then((data) => {
      this.setState({
        roostate: {
          baseCur: this.state.roostate.baseCur,
          targetCur: this.state.roostate.targetCur,
          amount: this.state.roostate.amount,
          conAmount: this.state.roostate.amount,
          histCur: data
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
    
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
          <Container fluid>
            <Row className="justify-content-center">
              <Col xs="auto" lg="auto" className="d-flex align-items-center">
                <Spinner animation="border" variant="primary" />
              </Col>
            </Row>
          </Container>
        </div>
        <Ribbon />
        <Banner />
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs="12" lg="6">
              <Card style={{margin: '1em auto'}}>
                <Card.Body>
                  <Card.Title style={{fontSize: '2rem'}}>Convert Your Currency Now</Card.Title>
                    <hr />
                    <Display displayprops={this.state.roostate}/>
                    <AppForm process={this.process} state={this.state.roostate}/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" lg="6">
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
