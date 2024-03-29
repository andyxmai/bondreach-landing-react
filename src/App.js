import React, { Component } from 'react';
import axios from 'axios';
import LaddaButton, { XS, SLIDE_UP } from 'react-ladda';
import {ToastContainer, ToastMessage} from 'react-toastr';
import compose from './compose.png';
import read from './read.png';
import notes from './notes.png';
import './App.css';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);


var baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.bondreach.com'
  window.heap.load("438302211");
} else {
  baseURL = 'http://localhost:8000'
  window.heap.load("1390131832");
}

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      error: '',
      success: '',
      hasScrolled: false,
    };
    this.handleEmailChanged = this.handleEmailChanged.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.getNavbarStyle = this.getNavbarStyle.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleEmailChanged(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleScroll(event) {
    const scrollTop = event.srcElement.body.scrollTop
    if (scrollTop > 0) {
      if (this.state.hasScrolled !== true) {
        this.setState({hasScrolled: true})
      }
    } else {
      if (this.state.hasScrolled !== false) {
        this.setState({hasScrolled: false})
      }
    }
  }

  handleEmailSubmit(e) {
    this.setState({isLoading: true})
    const email = this.state.email;
    const params = { email }
    apiClient.post('/v1/customers/beta/', params)
      .then((res) => {
        this.setState({email: '', isLoading: false})
        this.refs.container.success(
          "We will follow up shortly.",
          "Thank you for you interest!", {
          timeOut: 5000,
          extendedTimeOut: 10000
        });
      })
      .catch((err) => {
        this.setState({isLoading: false})
        this.refs.container.error(
          "Something happened. Please try a different email.",
          "Oh no!", {
          timeOut: 5000,
          extendedTimeOut: 10000
        });
      });
  }

  getNavbarStyle() {
    var navbarStyle = {
      position: 'fixed',
      zIndex: '1000',
    }
    if (this.state.hasScrolled) {
      navbarStyle['borderBottom'] = '1px solid #D7DADA'
    }

    return navbarStyle
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light navbar-custom" style={this.getNavbarStyle()}>
          <h1 className="navbar-brand mb-0 brand-custom">BondReach</h1>
        </nav>
        <div className="container-fluid main">
          <ToastContainer ref="container"
                            toastMessageFactory={ToastMessageFactory}
                            className="toast-top-right" />
          <div className="row">
            <div className="col title">
              Modernize your rolodex
            </div>
          </div>
          <div className="row">
            <div className="col subtitle">
              <div className="subtitle-line">The only commercial real estate specialized CRM tool that works from your inbox.</div>
              <div className="subtitle-line">No more customizing tools and entering data on separate applications.</div>
            </div>
          </div>
          <div className="email-section">
            <div className="row center header">
              <div className="col">
                <div>Free during our limited beta period. For investors and brokers.</div>
              </div>
            </div>
            <div className="row email center">
              <div className="col-lg-12">
                <div className="input-group">
                  <input type="email"
                    className="form-control no-radius"
                    placeholder="Enter email address"
                    onChange={this.handleEmailChanged}
                    value={this.state.email} />
                  <span className="input-group-btn">
                    <LaddaButton
                      className="button no-radius"
                      loading={this.state.isLoading}
                      onClick={this.handleEmailSubmit}
                      data-color="#00a7cf"
                      data-size={XS}
                      data-style={SLIDE_UP}
                      data-spinner-size={30}
                      data-spinner-color="#ddd"
                      data-spinner-lines={12}
                    >
                      Get Early Access
                    </LaddaButton>
                  </span>
                </div>
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
              <div className="imageContainer"><img src={read} className="image img-responsive" alt="Read" /></div>
            </div>
          </div>

          <div className="section-space" />

          <div className="row">
            <div className="col">
              <div className="header">Take notes on your contacts and search for them later.</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="imageContainer"><img src={notes} className="image img-responsive" alt="Notes" /></div>
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
              <div className="imageContainer"><img src={compose} className="image img-responsive" alt="Compose" /></div>
            </div>
          </div>

          <div className="section-space" />

          <div className="row">
            <div className="col">
              <div className="center header">Deep sync with your calendar & contacts, tag emails, and many more...</div>
            </div>
          </div>
          <div className="row email center">
            <div className="col-lg-12">
              <div className="input-group">
                <input type="email"
                  className="form-control no-radius"
                  placeholder="Enter email address"
                  onChange={this.handleEmailChanged}
                  value={this.state.email} />
                <span className="input-group-btn">
                  <LaddaButton
                    className="button no-radius"
                    loading={this.state.isLoading}
                    onClick={this.handleEmailSubmit}
                    data-color="#00a7cf"
                    data-size={XS}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                  >
                    Get Early Access
                  </LaddaButton>
                </span>
              </div>
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
      </div>
    );
  }
}

export default App;
