import React, { createRef, RefObject } from 'react';
import styles from './Form.module.css';
import { options } from './options';
import { Form, InputGroup, Button, Container, Row, Col, Modal } from 'react-bootstrap';

type FormState = {
  baseCur: string,
  targetCur: string,
  amount: string,
  valid: boolean
}

type FormProps = {
  process: Function,
  state: {
    histCur: {
      base: string,
      target: string
    }[],
    amount: string
  }
}

class AppForm extends React.Component<{formprops: FormProps}, {formstate: FormState, show: boolean}> {
  formRefs!: {
    baseRef: RefObject<HTMLSelectElement>;
    targetRef: RefObject<HTMLSelectElement>;
    intButtonRef: RefObject<HTMLButtonElement>;
    conButtonRef: RefObject<HTMLButtonElement>;
    inputRef: RefObject<HTMLInputElement>;
  };

  constructor(props: {formprops: FormProps}) {
    super(props);
    this.state = {
      formstate: {
        baseCur: this.props.formprops.state.histCur[0].base.slice(-3) || 'AED',
        targetCur: this.props.formprops.state.histCur[0].target.slice(-3) || 'AED',
        amount: this.props.formprops.state.amount,
        valid: true
      },
      show: false
    };

    this.formRefs = {
      baseRef: createRef(),
      targetRef: createRef(),
      intButtonRef: createRef(),
      conButtonRef: createRef(),
      inputRef: createRef()
    }
  }

  handleChange = (event: { target: { id: string, value: string } }) => {
    if (event.target.id === 'Form.ControlSelect1') {
      this.setState({
        formstate: {
          baseCur: event.target.value,
          targetCur: this.state.formstate.targetCur,
          amount: this.state.formstate.amount,
          valid: this.state.formstate.valid
        }
      });
    } else if (event.target.id === 'Form.ControlSelect2') {
      this.setState({
        formstate: {
          baseCur: this.state.formstate.baseCur,
          targetCur: event.target.value,
          amount: this.state.formstate.amount,
          valid: this.state.formstate.valid
        }
      });
    }
  }

  handleSubmit = (event: { preventDefault: () => void }) => {
    if (this.state.formstate.valid) {
      this.props.formprops.process(this.state.formstate);
    } else {
      this.setState({ show: true });
    }
    event.preventDefault();
  }

  handleClick = () => {
    this.setState({
      formstate: {
        baseCur: this.state.formstate.targetCur,
        targetCur: this.state.formstate.baseCur,
        amount: this.state.formstate.amount,
        valid: this.state.formstate.valid
      }
    }, () => {
      let baseVal = this.formRefs.baseRef.current?.getAttribute('value') || 'AED';
      let targetVal = this.formRefs.targetRef.current?.getAttribute('value') || 'AED';
      this.formRefs.baseRef.current?.setAttribute('value', targetVal);
      this.formRefs.targetRef.current?.setAttribute('value', baseVal)

      if (this.state.formstate.valid) {
        this.props.formprops.process(this.state.formstate);
      } else {
        this.setState({ show: true });
      }
    });
  }

  setStateForHandleBlur = (valid: boolean) => {
    if (this.formRefs.inputRef.current) {
      this.setState({
        formstate: {
          baseCur: this.formRefs.baseRef.current?.value || 'AED',
          targetCur: this.formRefs.targetRef.current?.value || 'AED',
          amount: this.formRefs.inputRef.current.value,
          valid: valid
        }
      });
    }
  }

  handleBlur = (event: { target: { value: string; }; }) => {
    if (this.formRefs.inputRef.current?.value) {
      if (/^([0-9])+(.)([0-9])+$/.test(this.formRefs.inputRef.current.value)) {
        this.setStateForHandleBlur(true);
      } else {
        this.setStateForHandleBlur(false);
        this.formRefs.inputRef.current.setAttribute('style', 'border: 2px solid red');
      }
    } else {
      event.target.value = this.formRefs.inputRef.current?.getAttribute('value') || '1.0000' ;
    }
  }

  handleFocus = (event: { target: { value: string; }; }) => {
    event.target.value = '';
    this.formRefs.inputRef.current?.setAttribute('style', 'border: 1px solid #007bff');
  }

  render() {
    return (
      <Container fluid>
        <Modal show={this.state.show} onHide={() => {this.setState({ show: false })}}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please check your amount input!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => {this.setState({ show: false })}}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form onSubmit={this.handleSubmit}>
        <Row className="justify-content-center mb-3">
          <Col xs="12" lg="10">
            <Form.Group controlId="Form.Input">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    Base Amount
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control title="Enter Amount" as="input" placeholder="Enter amount" 
                onBlur={this.handleBlur} onFocus={this.handleFocus} inputMode="numeric"
                defaultValue={this.props.formprops.state.amount} className={"text-right " + styles.Input} 
                ref={this.formRefs.inputRef}>
                </Form.Control>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col xs="12" lg="4">
            <Form.Group as={Row} controlId="Form.ControlSelect1">
              <Form.Label column lg="12" xs="4">Base Cur.</Form.Label>
              <Col lg="12" xs="8">
                <Form.Control title="Select Base Currency" as="select" 
                onChange={this.handleChange} defaultValue={this.props.formprops.state.histCur[0].base.slice(-3)} 
                ref={this.formRefs.baseRef} className={styles.Select}>
                {options}
              </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col xs="12" lg="2" className="d-flex align-items-center justify-content-center">
            <Button className={"mb-4 mt-2 " + styles.ExchangeButton}
            variant="outline-primary" title="Interchange" onClick={this.handleClick} 
            ref={this.formRefs.intButtonRef}>
              <i className="fas fa-exchange-alt"></i>
            </Button>
          </Col>
          <Col xs="12" lg="4">
            <Form.Group as={Row} controlId="Form.ControlSelect2">
              <Form.Label column lg="12" xs="4">Target Cur.</Form.Label>
              <Col lg="12" xs="8">
                <Form.Control title="Select Target Currency" as="select" 
                onChange={this.handleChange} defaultValue={this.props.formprops.state.histCur[0].target.slice(-3)} 
                ref={this.formRefs.targetRef} className={styles.Select}>
                {options}
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="primary" type="submit" title="Convert Now"
            ref={this.formRefs.conButtonRef}>
              &nbsp;Convert&nbsp;
            </Button>
          </Col>
        </Row>
        </Form>
      </Container>
    );
  }
}

export default AppForm;
