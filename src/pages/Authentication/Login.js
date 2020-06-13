import React, { Component } from 'react';

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Spinner,
} from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { loginUser, apiError } from '../../store/actions';

// import images
import profile from '../../assets/images/profile-img.png';
import logo from '../../assets/images/logo.svg';

import { withNamespaces } from 'react-i18next';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.loginUser(values, this.props.history);
  }

  componentDidMount() {
    this.props.apiError('');
    console.log(process.env.REACT_APP_DEFAULTAUTH);
  }

  render() {
    const { t, loading, error } = this.props;
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">
                            {t('login.welcome_back')}
                          </h5>
                          <p>{t('login.sign_in_to_continue')}.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        {error ? (
                          <Alert color="danger">
                            {t(`errors.login.${error.message}`)}
                          </Alert>
                        ) : null}

                        <div className="form-group">
                          <AvField
                            name="username"
                            label={t('login.username')}
                            value="ayoub"
                            className="form-control"
                            placeholder={t('login.placeholder_username')}
                            required
                            errorMessage={t('errors.login.username')}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="password"
                            label={t('login.password')}
                            value="123456789"
                            type="password"
                            required
                            placeholder={t('login.placeholder_password')}
                            errorMessage={t('errors.login.password')}
                          />
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            disabled={loading}
                          >
                            {t('login.login')}
                            {loading && <Spinner color="info" size="sm" />}
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock mr-1"></i>{' '}
                            {t('login.forgot_password')}
                          </Link>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    {t('login.not_account')}{' '}
                    <Link
                      to="register"
                      className="font-weight-medium text-primary"
                    >
                      {' '}
                      {t('login.signup_now')}{' '}
                    </Link>{' '}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { error, loading } = state.Login;
  return { error, loading };
};

export default withRouter(
  connect(mapStatetoProps, { loginUser, apiError })(withNamespaces()(Login))
);
