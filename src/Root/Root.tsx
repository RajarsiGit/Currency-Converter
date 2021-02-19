import React from 'react';
//import styles from './Root.module.css';
import Display from '../Display/Display';
import AppForm from '../Form/Form';
import Conversion from '../Conversion/Conversion';
import Banner from '../Banner/Banner';
import Ribbon from '../Ribbon/Ribbon';

class Root extends React.Component<{}, { baseCur: string, targetCur: string, amount: string, conAmount: string }> {
  constructor(props: any | Readonly<{}>) {
    super(props);
    this.state = {
      baseCur: 'AED',
      targetCur: 'AED',
      amount: '1.00',
      conAmount: '1.00'
    };

    this.process = this.process.bind(this);
  }

  process(state: any) {
    Conversion((conAmount: string) => {
      this.setState({
        baseCur: state.baseCur,
        targetCur: state.targetCur,
        amount: state.amount,
        conAmount: conAmount
      });
    }, state.baseCur, state.targetCur, state.amount);
  }

  render() {
    return (
      <div>
        <Ribbon />
        <Banner />
        <Display conAmount={this.state.conAmount}/>
        <AppForm process={this.process} state={this.state}/>
      </div>
    );
  }
}

export default Root;
