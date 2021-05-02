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
import { db, getData } from '../Database/dbHandler'

type rootState = {
  amount: string,
  histCur: {
    base: string,
    target: string
  }[],
  loading: boolean
}

class Root extends React.Component<{}, { roostate: rootState }> {
  rootRef!: {
    spinnerRef: any;
  }
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {
      roostate: {
        amount: '1.0000',
        histCur: [{
          base: '',
          target: ''
        }],
        loading: true
      }
    };
    this.rootRef = {
      spinnerRef: null
    }
  }

  process = (state: any) => {
    Conversion(state.baseCur, state.targetCur, state.amount)
    .then(() => {
      getData(db)
      .then((data: any) => {
        this.setState({
          roostate: {
            amount: state.amount,
            histCur: data,
            loading: false
          }
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount = () => {
    window.addEventListener('load', () => {
      getData(db)
      .then((data) => {
        this.setState({
          roostate: {
            amount: this.state.roostate.amount,
            histCur: data,
            loading: false
          }
        }, () => {
          setTimeout(() => {
            this.rootRef.spinnerRef.style.opacity = '0';
          }, 1);
          setTimeout(() => {
            this.rootRef.spinnerRef.style.display = 'none';
          }, 700);
        });
      })
      .catch((err) => {
        console.error(err);
      });
    });
  }

  asyncRender = (data: any) => {
    return (
      <div>
        <Display displayprops={data}/>
        <AppForm formprops={{process: this.process, state: data}}/>
      </div>
    );
  }

  render() {
    const loading = this.state.roostate.loading;
    const rootstate = this.state.roostate;
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
                    {loading ? "Still Loading" : this.asyncRender(rootstate)}
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
