import React, { Component } from 'react';
import axios from 'axios';
import {ToastContainer, ToastMessage} from 'react-toastr';
import compose from './compose.png';
import read from './read.png';
import './App.css';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

var baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.bondreach.com'
} else {
  baseURL = 'http://localhost:8000'
}

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      success: '',
    };
    this.handleEmailChanged = this.handleEmailChanged.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  handleEmailChanged(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleEmailSubmit(e) {
    const email = this.state.email;
    const params = { email }
    apiClient.post('/v1/customers/beta/', params)
      .then((res) => {
        this.setState({email: ''})
        this.refs.container.success(
          "We will follow up shortly.",
          "Thank you for you interest!", {
          timeOut: 5000,
          extendedTimeOut: 10000
        });
      })
      .catch((err) => {
        this.refs.container.error(
          "Something happened. Please try a different email.",
          "Oh no!", {
          timeOut: 5000,
          extendedTimeOut: 10000
        });
      });
  }

  render() {
    return (
      <div className="container">
        <ToastContainer ref="container"
                          toastMessageFactory={ToastMessageFactory}
                          className="toast-top-right" />
        <div className="row">
          <div className="col title">
            BondReach
          </div>
        </div>
        <div className="row">
          <div className="col subtitle">
            <div>The only commercial real estate specialized CRM tool that works from your inbox.</div>
            <div>Say goodbye to customizing tools and entering data.</div>
          </div>
        </div>
        <div className="email-section">
          <div className="row center header">
            <div className="col">
              <div>Free during our limited beta period. Great for investors and brokers.</div>
            </div>
          </div>
          <div className="row email center">
            <div className="col-8">
              <div className="form-group">
                <input type="email"
                  className="form-control no-radius"
                  placeholder="Enter email address"
                  onChange={this.handleEmailChanged}
                  value={this.state.email} />
              </div>
            </div>
            <div className="col-4 no-padding">
              <button type="button" className="btn button no-radius" onClick={this.handleEmailSubmit}>Get Early Access</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="header">Client information right in your email so you can have richer interactions when alerted.</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="imageContainer"><img src={read} className="image" alt="Read" /></div>
          </div>
        </div>

        <div className="section-space" />

        <div className="row">
          <div className="col">
            <div className="header">Target your clients for each deal with higher precision, with no extra effort.</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="imageContainer"><img src={compose} className="image" alt="Compose" /></div>
          </div>
        </div>

        <div className="section-space" />

        <div className="row">
          <div className="col">
            <div className="center header">and many more...</div>
          </div>
        </div>
        <div className="row email center">
          <div className="col-8">
            <div className="form-group">
              <input type="email"
                className="form-control no-radius"
                placeholder="Enter email address"
                onChange={this.handleEmailChanged}
                value={this.state.email} />
            </div>
          </div>
          <div className="col-4 no-padding">
            <button type="button" className="btn button no-radius" onClick={this.handleEmailSubmit}>Get Early Access</button>
          </div>
        </div>
        <div className="section-space" />

        <div className="row">
          <div className="col">
            <div className="center questions header">Questions?</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="center">Email <b>bondreachRE@gmail.com</b></div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default App;