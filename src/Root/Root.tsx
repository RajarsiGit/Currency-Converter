import React from 'react';
import styles from './Root.module.css';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Display from '../Display/Display';
import AppForm from '../Form/Form';
import convert from '../Conversion/Conversion';
import Banner from '../Banner/Banner';
import Ribbon from '../Ribbon/Ribbon';
import Footer from '../Footer/Footer';
import History from '../History/History';
import { db, getData, deleteData } from '../Database/dbHandler'

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
    this.setState({
      roostate: {
        amount: state.amount,
        histCur: this.state.roostate.histCur,
        loading: true
      }
    }, () => {
      convert(state.baseCur, state.targetCur, state.amount)
      .then((data: {base: string, target: string}[]) => {
        this.setState({
          roostate: {
            amount: state.amount,
            histCur: data.length > 0 ? data : this.state.roostate.histCur,
            loading: false
          }
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
    });
  }

  reset = (): Promise<void> => {
    return new Promise(() => {
      this.setState({
        roostate: {
          amount: this.state.roostate.amount,
          histCur: this.state.roostate.histCur,
          loading: true
        }
      }, () => {
        deleteData(db)
        .then(() => {
          this.setState({
            roostate: {
              amount: '1.0000',
              histCur: [{
                base: '',
                target: ''
              }],
              loading: false
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
      });
    });
  }

  componentDidMount = () => {
    window.addEventListener('load', () => {
      getData(db)
      .then((data) => {
        this.setState({
          roostate: {
            amount: this.state.roostate.amount,
            histCur: data.length > 0 ? data : this.state.roostate.histCur,
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

  asyncDisplayFormRender = (data: any) => {
    return (
      <div>
        <Display displayprops={data.histCur[0]}/>
        <AppForm formprops={{process: this.process, state: data}}/>
      </div>
    );
  }

  asyncHistoryRender = (data: any) => {
    return (
      <div>
        <History histcur={data} reset={this.reset} />
      </div>
    );
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
                    {this.state.roostate.loading ? <Spinner animation="border" variant="primary" /> :
                    this.asyncDisplayFormRender(this.state.roostate)}
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
                    {this.state.roostate.loading ? <Spinner animation="border" variant="primary" /> :
                    this.asyncHistoryRender(this.state.roostate.histCur)}
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
