import React from 'react';
//import styles from './Form.module.css';
import { Form, InputGroup, Button, Container, Row, Col, Modal } from 'react-bootstrap';

type FormState = {
  baseCur: string,
  targetCur: string,
  amount: string,
  valid: boolean
}

class AppForm extends React.Component<{process: any, state: any}, {formstate: FormState, show: boolean}> {
  formRefs!: {
    baseRef: any;
    targetRef: any;
    intButtonRef: any;
    conButtonRef: any;
    inputRef: any;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      formstate: {
        baseCur: this.props.state.baseCur,
        targetCur: this.props.state.targetCur,
        amount: this.props.state.amount,
        valid: true
      },
      show: false
    };

    this.formRefs = {
      baseRef: null,
      targetRef: null,
      intButtonRef: null,
      conButtonRef: null,
      inputRef: false
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
      this.props.process(this.state.formstate);
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
      [this.formRefs.baseRef.value, this.formRefs.targetRef.value] = 
      [this.formRefs.targetRef.value, this.formRefs.baseRef.value];
      if (this.state.formstate.valid) {
        this.props.process(this.state.formstate);
      } else {
        this.setState({ show: true });
      }
    });
  }

  handleBlur = () => {
    if (this.formRefs.inputRef.value) {
      if (parseFloat(this.formRefs.inputRef.value)) {
        this.formRefs.inputRef.value = this.formRefs.inputRef.value.includes('.')?
        this.formRefs.inputRef.value : this.formRefs.inputRef.value.concat('.0000');
        this.setState({
          formstate: {
            baseCur: this.formRefs.baseRef.value,
            targetCur: this.formRefs.targetRef.value,
            amount: this.formRefs.inputRef.value,
            valid: true
          }
        });
      } else {
        this.setState({
          formstate: {
            baseCur: this.formRefs.baseRef.value,
            targetCur: this.formRefs.targetRef.value,
            amount: this.state.formstate.amount,
            valid: false
          }
        });
        this.formRefs.inputRef.style.border = '2px solid red';
      }
    } else {
      this.formRefs.inputRef.value = this.state.formstate.amount;
    }
  }

  handleFocus = () => {
    this.formRefs.inputRef.value = '';
    this.formRefs.inputRef.style.border = '';
  }

  render() {
    return (
      <Container fluid className="text-center">
        <Modal show={this.state.show} onHide={(e: any) => {this.setState({ show: false })}}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please check your amount input!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={(e: any) => {this.setState({ show: false })}}>
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
                onBlur={this.handleBlur} onFocus={this.handleFocus} 
                defaultValue={this.props.state.amount} className="text-right" 
                ref={(e: any) => this.formRefs.inputRef = e}>
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
                onChange={this.handleChange} defaultValue={this.props.state.baseCur} 
                ref={(e: any) => this.formRefs.baseRef = e}>
                <option value="AED">AED - United Arab Emirates Dirham</option>
                <option value="AFN">AFN - Afghan Afghani</option>
                <option value="ALL">ALL - Albanian Lek</option>
                <option value="AMD">AMD - Armenian Dram</option>
                <option value="ANG">ANG - Netherlands Antillean Guilder</option>
                <option value="AOA">AOA - Angolan Kwanza</option>
                <option value="ARS">ARS - Argentine Peso</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="AWG">AWG - Aruban Florin</option>
                <option value="AZN">AZN - Azerbaijani Manat</option>
                <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark</option>
                <option value="BBD">BBD - Barbadian Dollar</option>
                <option value="BDT">BDT - Bangladeshi Taka</option>
                <option value="BGN">BGN - Bulgarian Lev</option>
                <option value="BHD">BHD - Bahraini Dinar</option>
                <option value="BIF">BIF - Burundian Franc</option>
                <option value="BMD">BMD - Bermudan Dollar</option>
                <option value="BND">BND - Brunei Dollar</option>
                <option value="BOB">BOB - Bolivian Boliviano</option>
                <option value="BRL">BRL - Brazilian Real</option>
                <option value="BSD">BSD - Bahamian Dollar</option>
                <option value="BTC">BTC - Bitcoin</option>
                <option value="BTN">BTN - Bhutanese Ngultrum</option>
                <option value="BWP">BWP - Botswanan Pula</option>
                <option value="BYR">BYR - Belarusian Ruble</option>
                <option value="BYN">BYN - New Belarusian Ruble</option>
                <option value="BZD">BZD - Belize Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CDF">CDF - Congolese Franc</option>
                <option value="CHF">CHF - Swiss Franc</option>
                <option value="CLF">CLF - Chilean Unit of Account (UF)</option>
                <option value="CLP">CLP - Chilean Peso</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="COP">COP - Colombian Peso</option>
                <option value="CRC">CRC - Costa Rican Colón</option>
                <option value="CUC">CUC - Cuban Convertible Peso</option>
                <option value="CUP">CUP - Cuban Peso</option>
                <option value="CVE">CVE - Cape Verdean Escudo</option>
                <option value="CZK">CZK - Czech Republic Koruna</option>
                <option value="DJF">DJF - Djiboutian Franc</option>
                <option value="DKK">DKK - Danish Krone</option>
                <option value="DOP">DOP - Dominican Peso</option>
                <option value="DZD">DZD - Algerian Dinar</option>
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="ERN">ERN - Eritrean Nakfa</option>
                <option value="ETB">ETB - Ethiopian Birr</option>
                <option value="EUR">EUR - Euro</option>
                <option value="FJD">FJD - Fijian Dollar</option>
                <option value="FKP">FKP - Falkland Islands Pound</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="GEL">GEL - Georgian Lari</option>
                <option value="GGP">GGP - Guernsey Pound</option>
                <option value="GHS">GHS - Ghanaian Cedi</option>
                <option value="GIP">GIP - Gibraltar Pound</option>
                <option value="GMD">GMD - Gambian Dalasi</option>
                <option value="GNF">GNF - Guinean Franc</option>
                <option value="GTQ">GTQ - Guatemalan Quetzal</option>
                <option value="GYD">GYD - Guyanaese Dollar</option>
                <option value="HKD">HKD - Hong Kong Dollar</option>
                <option value="HNL">HNL - Honduran Lempira</option>
                <option value="HRK">HRK - Croatian Kuna</option>
                <option value="HTG">HTG - Haitian Gourde</option>
                <option value="HUF">HUF - Hungarian Forint</option>
                <option value="IDR">IDR - Indonesian Rupiah</option>
                <option value="ILS">ILS - Israeli New Sheqel</option>
                <option value="IMP">IMP - Manx pound</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="IQD">IQD - Iraqi Dinar</option>
                <option value="IRR">IRR - Iranian Rial</option>
                <option value="ISK">ISK - Icelandic Króna</option>
                <option value="JEP">JEP - Jersey Pound</option>
                <option value="JMD">JMD - Jamaican Dollar</option>
                <option value="JOD">JOD - Jordanian Dinar</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="KGS">KGS - Kyrgystani Som</option>
                <option value="KHR">KHR - Cambodian Riel</option>
                <option value="KMF">KMF - Comorian Franc</option>
                <option value="KPW">KPW - North Korean Won</option>
                <option value="KRW">KRW - South Korean Won</option>
                <option value="KWD">KWD - Kuwaiti Dinar</option>
                <option value="KYD">KYD - Cayman Islands Dollar</option>
                <option value="KZT">KZT - Kazakhstani Tenge</option>
                <option value="LAK">LAK - Laotian Kip</option>
                <option value="LBP">LBP - Lebanese Pound</option>
                <option value="LKR">LKR - Sri Lankan Rupee</option>
                <option value="LRD">LRD - Liberian Dollar</option>
                <option value="LSL">LSL - Lesotho Loti</option>
                <option value="LTL">LTL - Lithuanian Litas</option>
                <option value="LVL">LVL - Latvian Lats</option>
                <option value="LYD">LYD - Libyan Dinar</option>
                <option value="MAD">MAD - Moroccan Dirham</option>
                <option value="MDL">MDL - Moldovan Leu</option>
                <option value="MGA">MGA - Malagasy Ariary</option>
                <option value="MKD">MKD - Macedonian Denar</option>
                <option value="MMK">MMK - Myanma Kyat</option>
                <option value="MNT">MNT - Mongolian Tugrik</option>
                <option value="MOP">MOP - Macanese Pataca</option>
                <option value="MRO">MRO - Mauritanian Ouguiya</option>
                <option value="MUR">MUR - Mauritian Rupee</option>
                <option value="MVR">MVR - Maldivian Rufiyaa</option>
                <option value="MWK">MWK - Malawian Kwacha</option>
                <option value="MXN">MXN - Mexican Peso</option>
                <option value="MYR">MYR - Malaysian Ringgit</option>
                <option value="MZN">MZN - Mozambican Metical</option>
                <option value="NAD">NAD - Namibian Dollar</option>
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="NIO">NIO - Nicaraguan Córdoba</option>
                <option value="NOK">NOK - Norwegian Krone</option>
                <option value="NPR">NPR - Nepalese Rupee</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
                <option value="OMR">OMR - Omani Rial</option>
                <option value="PAB">PAB - Panamanian Balboa</option>
                <option value="PEN">PEN - Peruvian Nuevo Sol</option>
                <option value="PGK">PGK - Papua New Guinean Kina</option>
                <option value="PHP">PHP - Philippine Peso</option>
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="PLN">PLN - Polish Zloty</option>
                <option value="PYG">PYG - Paraguayan Guarani</option>
                <option value="QAR">QAR - Qatari Rial</option>
                <option value="RON">RON - Romanian Leu</option>
                <option value="RSD">RSD - Serbian Dinar</option>
                <option value="RUB">RUB - Russian Ruble</option>
                <option value="RWF">RWF - Rwandan Franc</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="SBD">SBD - Solomon Islands Dollar</option>
                <option value="SCR">SCR - Seychellois Rupee</option>
                <option value="SDG">SDG - Sudanese Pound</option>
                <option value="SEK">SEK - Swedish Krona</option>
                <option value="SGD">SGD - Singapore Dollar</option>
                <option value="SHP">SHP - Saint Helena Pound</option>
                <option value="SLL">SLL - Sierra Leonean Leone</option>
                <option value="SOS">SOS - Somali Shilling</option>
                <option value="SRD">SRD - Surinamese Dollar</option>
                <option value="STD">STD - São Tomé and Príncipe Dobra</option>
                <option value="SVC">SVC - Salvadoran Colón</option>
                <option value="SYP">SYP - Syrian Pound</option>
                <option value="SZL">SZL - Swazi Lilangeni</option>
                <option value="THB">THB - Thai Baht</option>
                <option value="TJS">TJS - Tajikistani Somoni</option>
                <option value="TMT">TMT - Turkmenistani Manat</option>
                <option value="TND">TND - Tunisian Dinar</option>
                <option value="TOP">TOP - Tongan Paʻanga</option>
                <option value="TRY">TRY - Turkish Lira</option>
                <option value="TTD">TTD - Trinidad and Tobago Dollar</option>
                <option value="TWD">TWD - New Taiwan Dollar</option>
                <option value="TZS">TZS - Tanzanian Shilling</option>
                <option value="UAH">UAH - Ukrainian Hryvnia</option>
                <option value="UGX">UGX - Ugandan Shilling</option>
                <option value="USD">USD - United States Dollar</option>
                <option value="UYU">UYU - Uruguayan Peso</option>
                <option value="UZS">UZS - Uzbekistan Som</option>
                <option value="VEF">VEF - Venezuelan Bolívar Fuerte</option>
                <option value="VND">VND - Vietnamese Dong</option>
                <option value="VUV">VUV - Vanuatu Vatu</option>
                <option value="WST">WST - Samoan Tala</option>
                <option value="XAF">XAF - CFA Franc BEAC</option>
                <option value="XAG">XAG - Silver (troy ounce)</option>
                <option value="XAU">XAU - Gold (troy ounce)</option>
                <option value="XCD">XCD - East Caribbean Dollar</option>
                <option value="XDR">XDR - Special Drawing Rights</option>
                <option value="XOF">XOF - CFA Franc BCEAO</option>
                <option value="XPF">XPF - CFP Franc</option>
                <option value="YER">YER - Yemeni Rial</option>
                <option value="ZAR">ZAR - South African Rand</option>
                <option value="ZMK">ZMK - Zambian Kwacha (pre-2013)</option>
                <option value="ZMW">ZMW - Zambian Kwacha</option>
                <option value="ZWL">ZWL - Zimbabwean Dollar</option>
              </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col xs="12" lg="2" className="d-flex align-items-center justify-content-center">
            <Button className="mb-2 mt-n2" style={{paddingTop: '0.45em', 
            paddingBottom: '0.45em', borderRadius: '50%'}} variant="primary" 
            title="Interchange" onClick={this.handleClick} 
            ref={(e: any) => this.formRefs.intButtonRef = e}>
              <i className="fa fa-sync-alt"></i>
            </Button>
          </Col>
          <Col xs="12" lg="4">
            <Form.Group as={Row} controlId="Form.ControlSelect2">
              <Form.Label column lg="12" xs="4">Target Cur.</Form.Label>
              <Col lg="12" xs="8">
                <Form.Control title="Select Target Currency" as="select" 
                onChange={this.handleChange} defaultValue={this.props.state.targetCur} 
                ref={(e: any) => this.formRefs.targetRef = e}>
                  <option value="AED">AED - United Arab Emirates Dirham</option>
                  <option value="AFN">AFN - Afghan Afghani</option>
                  <option value="ALL">ALL - Albanian Lek</option>
                  <option value="AMD">AMD - Armenian Dram</option>
                  <option value="ANG">ANG - Netherlands Antillean Guilder</option>
                  <option value="AOA">AOA - Angolan Kwanza</option>
                  <option value="ARS">ARS - Argentine Peso</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="AWG">AWG - Aruban Florin</option>
                  <option value="AZN">AZN - Azerbaijani Manat</option>
                  <option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark</option>
                  <option value="BBD">BBD - Barbadian Dollar</option>
                  <option value="BDT">BDT - Bangladeshi Taka</option>
                  <option value="BGN">BGN - Bulgarian Lev</option>
                  <option value="BHD">BHD - Bahraini Dinar</option>
                  <option value="BIF">BIF - Burundian Franc</option>
                  <option value="BMD">BMD - Bermudan Dollar</option>
                  <option value="BND">BND - Brunei Dollar</option>
                  <option value="BOB">BOB - Bolivian Boliviano</option>
                  <option value="BRL">BRL - Brazilian Real</option>
                  <option value="BSD">BSD - Bahamian Dollar</option>
                  <option value="BTC">BTC - Bitcoin</option>
                  <option value="BTN">BTN - Bhutanese Ngultrum</option>
                  <option value="BWP">BWP - Botswanan Pula</option>
                  <option value="BYR">BYR - Belarusian Ruble</option>
                  <option value="BYN">BYN - New Belarusian Ruble</option>
                  <option value="BZD">BZD - Belize Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="CDF">CDF - Congolese Franc</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="CLF">CLF - Chilean Unit of Account (UF)</option>
                  <option value="CLP">CLP - Chilean Peso</option>
                  <option value="CNY">CNY - Chinese Yuan</option>
                  <option value="COP">COP - Colombian Peso</option>
                  <option value="CRC">CRC - Costa Rican Colón</option>
                  <option value="CUC">CUC - Cuban Convertible Peso</option>
                  <option value="CUP">CUP - Cuban Peso</option>
                  <option value="CVE">CVE - Cape Verdean Escudo</option>
                  <option value="CZK">CZK - Czech Republic Koruna</option>
                  <option value="DJF">DJF - Djiboutian Franc</option>
                  <option value="DKK">DKK - Danish Krone</option>
                  <option value="DOP">DOP - Dominican Peso</option>
                  <option value="DZD">DZD - Algerian Dinar</option>
                  <option value="EGP">EGP - Egyptian Pound</option>
                  <option value="ERN">ERN - Eritrean Nakfa</option>
                  <option value="ETB">ETB - Ethiopian Birr</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="FJD">FJD - Fijian Dollar</option>
                  <option value="FKP">FKP - Falkland Islands Pound</option>
                  <option value="GBP">GBP - British Pound Sterling</option>
                  <option value="GEL">GEL - Georgian Lari</option>
                  <option value="GGP">GGP - Guernsey Pound</option>
                  <option value="GHS">GHS - Ghanaian Cedi</option>
                  <option value="GIP">GIP - Gibraltar Pound</option>
                  <option value="GMD">GMD - Gambian Dalasi</option>
                  <option value="GNF">GNF - Guinean Franc</option>
                  <option value="GTQ">GTQ - Guatemalan Quetzal</option>
                  <option value="GYD">GYD - Guyanaese Dollar</option>
                  <option value="HKD">HKD - Hong Kong Dollar</option>
                  <option value="HNL">HNL - Honduran Lempira</option>
                  <option value="HRK">HRK - Croatian Kuna</option>
                  <option value="HTG">HTG - Haitian Gourde</option>
                  <option value="HUF">HUF - Hungarian Forint</option>
                  <option value="IDR">IDR - Indonesian Rupiah</option>
                  <option value="ILS">ILS - Israeli New Sheqel</option>
                  <option value="IMP">IMP - Manx pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="IQD">IQD - Iraqi Dinar</option>
                  <option value="IRR">IRR - Iranian Rial</option>
                  <option value="ISK">ISK - Icelandic Króna</option>
                  <option value="JEP">JEP - Jersey Pound</option>
                  <option value="JMD">JMD - Jamaican Dollar</option>
                  <option value="JOD">JOD - Jordanian Dinar</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="KES">KES - Kenyan Shilling</option>
                  <option value="KGS">KGS - Kyrgystani Som</option>
                  <option value="KHR">KHR - Cambodian Riel</option>
                  <option value="KMF">KMF - Comorian Franc</option>
                  <option value="KPW">KPW - North Korean Won</option>
                  <option value="KRW">KRW - South Korean Won</option>
                  <option value="KWD">KWD - Kuwaiti Dinar</option>
                  <option value="KYD">KYD - Cayman Islands Dollar</option>
                  <option value="KZT">KZT - Kazakhstani Tenge</option>
                  <option value="LAK">LAK - Laotian Kip</option>
                  <option value="LBP">LBP - Lebanese Pound</option>
                  <option value="LKR">LKR - Sri Lankan Rupee</option>
                  <option value="LRD">LRD - Liberian Dollar</option>
                  <option value="LSL">LSL - Lesotho Loti</option>
                  <option value="LTL">LTL - Lithuanian Litas</option>
                  <option value="LVL">LVL - Latvian Lats</option>
                  <option value="LYD">LYD - Libyan Dinar</option>
                  <option value="MAD">MAD - Moroccan Dirham</option>
                  <option value="MDL">MDL - Moldovan Leu</option>
                  <option value="MGA">MGA - Malagasy Ariary</option>
                  <option value="MKD">MKD - Macedonian Denar</option>
                  <option value="MMK">MMK - Myanma Kyat</option>
                  <option value="MNT">MNT - Mongolian Tugrik</option>
                  <option value="MOP">MOP - Macanese Pataca</option>
                  <option value="MRO">MRO - Mauritanian Ouguiya</option>
                  <option value="MUR">MUR - Mauritian Rupee</option>
                  <option value="MVR">MVR - Maldivian Rufiyaa</option>
                  <option value="MWK">MWK - Malawian Kwacha</option>
                  <option value="MXN">MXN - Mexican Peso</option>
                  <option value="MYR">MYR - Malaysian Ringgit</option>
                  <option value="MZN">MZN - Mozambican Metical</option>
                  <option value="NAD">NAD - Namibian Dollar</option>
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="NIO">NIO - Nicaraguan Córdoba</option>
                  <option value="NOK">NOK - Norwegian Krone</option>
                  <option value="NPR">NPR - Nepalese Rupee</option>
                  <option value="NZD">NZD - New Zealand Dollar</option>
                  <option value="OMR">OMR - Omani Rial</option>
                  <option value="PAB">PAB - Panamanian Balboa</option>
                  <option value="PEN">PEN - Peruvian Nuevo Sol</option>
                  <option value="PGK">PGK - Papua New Guinean Kina</option>
                  <option value="PHP">PHP - Philippine Peso</option>
                  <option value="PKR">PKR - Pakistani Rupee</option>
                  <option value="PLN">PLN - Polish Zloty</option>
                  <option value="PYG">PYG - Paraguayan Guarani</option>
                  <option value="QAR">QAR - Qatari Rial</option>
                  <option value="RON">RON - Romanian Leu</option>
                  <option value="RSD">RSD - Serbian Dinar</option>
                  <option value="RUB">RUB - Russian Ruble</option>
                  <option value="RWF">RWF - Rwandan Franc</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="SBD">SBD - Solomon Islands Dollar</option>
                  <option value="SCR">SCR - Seychellois Rupee</option>
                  <option value="SDG">SDG - Sudanese Pound</option>
                  <option value="SEK">SEK - Swedish Krona</option>
                  <option value="SGD">SGD - Singapore Dollar</option>
                  <option value="SHP">SHP - Saint Helena Pound</option>
                  <option value="SLL">SLL - Sierra Leonean Leone</option>
                  <option value="SOS">SOS - Somali Shilling</option>
                  <option value="SRD">SRD - Surinamese Dollar</option>
                  <option value="STD">STD - São Tomé and Príncipe Dobra</option>
                  <option value="SVC">SVC - Salvadoran Colón</option>
                  <option value="SYP">SYP - Syrian Pound</option>
                  <option value="SZL">SZL - Swazi Lilangeni</option>
                  <option value="THB">THB - Thai Baht</option>
                  <option value="TJS">TJS - Tajikistani Somoni</option>
                  <option value="TMT">TMT - Turkmenistani Manat</option>
                  <option value="TND">TND - Tunisian Dinar</option>
                  <option value="TOP">TOP - Tongan Paʻanga</option>
                  <option value="TRY">TRY - Turkish Lira</option>
                  <option value="TTD">TTD - Trinidad and Tobago Dollar</option>
                  <option value="TWD">TWD - New Taiwan Dollar</option>
                  <option value="TZS">TZS - Tanzanian Shilling</option>
                  <option value="UAH">UAH - Ukrainian Hryvnia</option>
                  <option value="UGX">UGX - Ugandan Shilling</option>
                  <option value="USD">USD - United States Dollar</option>
                  <option value="UYU">UYU - Uruguayan Peso</option>
                  <option value="UZS">UZS - Uzbekistan Som</option>
                  <option value="VEF">VEF - Venezuelan Bolívar Fuerte</option>
                  <option value="VND">VND - Vietnamese Dong</option>
                  <option value="VUV">VUV - Vanuatu Vatu</option>
                  <option value="WST">WST - Samoan Tala</option>
                  <option value="XAF">XAF - CFA Franc BEAC</option>
                  <option value="XAG">XAG - Silver (troy ounce)</option>
                  <option value="XAU">XAU - Gold (troy ounce)</option>
                  <option value="XCD">XCD - East Caribbean Dollar</option>
                  <option value="XDR">XDR - Special Drawing Rights</option>
                  <option value="XOF">XOF - CFA Franc BCEAO</option>
                  <option value="XPF">XPF - CFP Franc</option>
                  <option value="YER">YER - Yemeni Rial</option>
                  <option value="ZAR">ZAR - South African Rand</option>
                  <option value="ZMK">ZMK - Zambian Kwacha (pre-2013)</option>
                  <option value="ZMW">ZMW - Zambian Kwacha</option>
                  <option value="ZWL">ZWL - Zimbabwean Dollar</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="primary" type="submit" title="Convert Now"
            ref={(e: any) => this.formRefs.conButtonRef = e}>
              Convert
            </Button>
          </Col>
        </Row>
        </Form>
      </Container>
    );
  }
}

export default AppForm;
