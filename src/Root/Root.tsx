import React from 'react';
//import styles from './Root.module.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
    baseCur: string,
    targetCur: string
  }[]
}

class Root extends React.Component<{}, { roostate: rootState }> {
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {
      roostate: {
        baseCur: 'AED',
        targetCur: 'AED',
        amount: '1.0000',
        conAmount: '1.0000',
        histCur: [{
          baseCur: '',
          targetCur: '',
        }, {
          baseCur: '',
          targetCur: '',
        }, {
          baseCur: '',
          targetCur: '',
        }, {
          baseCur: '',
          targetCur: '',
        }]
      }
    };

    this.process = this.process.bind(this);
  }

  process(state: any) {
    Conversion((conAmount: string) => {
      this.setState({
        roostate: {
          baseCur: state.baseCur,
          targetCur: state.targetCur,
          amount: state.amount,
          conAmount: conAmount,
          histCur: [{
            baseCur: state.baseCur,
            targetCur: state.targetCur
          }, {
            baseCur: this.state.roostate.histCur[0].baseCur,
            targetCur: this.state.roostate.histCur[0].targetCur
          }, {
            baseCur: this.state.roostate.histCur[1].baseCur,
            targetCur: this.state.roostate.histCur[1].targetCur
          }, {
            baseCur: this.state.roostate.histCur[2].baseCur,
            targetCur: this.state.roostate.histCur[2].targetCur
          }]
        }
      });
    }, state.baseCur, state.targetCur, state.amount);
  }

  render() {
    return (
      <div>
        <Ribbon />
        <Banner />
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" lg="8">
              <Card style={{margin: '1em auto'}}>
                <Card.Body>
                  <Card.Title style={{fontSize: '2rem'}}>Convert Now!</Card.Title>
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
