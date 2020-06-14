import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Spinner,
} from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// actions
import { addCompany } from '../../store/actions';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';

class CompaniesCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.addCompany(values, this.props.history);
  }

  render() {
    const { t, loading } = this.props;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs
              title={t('dashboard.company', { count: 3 })}
              breadcrumbItem={t('companies.add_company')}
            />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      {t('companies.add_company')}
                    </CardTitle>
                    <AvForm onValidSubmit={this.handleValidSubmit}>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="companyname"
                          className="col-form-label col-lg-2"
                        >
                          {t('companies.company_name')}
                        </Label>
                        <Col lg="10">
                          <AvField
                            id="companyname"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder={t('companies.company_placeholder')}
                            required
                            errorMessage={t('errors.companies.name')}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="companyaddress"
                          className="col-form-label col-lg-2"
                        >
                          {t('companies.address')}
                        </Label>
                        <Col lg="10">
                          <AvInput
                            className="form-control"
                            id="companyaddress"
                            rows="3"
                            name="address"
                            placeholder={t('companies.address_placeholder')}
                          ></AvInput>
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="companyenabled"
                          className="col-form-label col-lg-2"
                        >
                          {t('companies.enabled')}
                        </Label>
                        <Col lg="10">
                          <AvField
                            id="companyenabled"
                            name="enabled"
                            type="checkbox"
                            style={{ marginLeft: 0 }}
                          />
                        </Col>
                      </FormGroup>
                      <Row className="justify-content-end">
                        <Col lg="10">
                          <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                          >
                            {t('companies.add_button')}
                            {loading && <Spinner color="info" size="sm" />}
                          </Button>
                        </Col>
                      </Row>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { error, loading } = state.Companies;
  return { error, loading };
};

export default withRouter(
  connect(mapStatetoProps, { addCompany })(withNamespaces()(CompaniesCreate))
);
