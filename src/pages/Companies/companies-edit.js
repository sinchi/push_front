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
  Alert,
} from 'reactstrap';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// actions
import { editCompany, getCompanyById } from '../../store/actions';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import Dropzone from 'react-dropzone';

class CompaniesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleAcceptedFiles.bind(this);
  }

  componentDidMount() {
    const { match, getCompanyById } = this.props;
    getCompanyById(match.params.id);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    const company = Object.assign({}, values, {
      logo: this.state.selectedFiles ? this.state.selectedFiles[0] : '',
    });
    const { editCompany, history, match } = this.props;
    editCompany(company, history, match.params.id);
  }

  handleAcceptedFiles = (files) => {
    console.log({ files });
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    );

    this.setState({ selectedFiles: files });
  };

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  render() {
    const { t, loading, error, company } = this.props;
    if (!company)
      return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;
    return (
      <React.Fragment>
        <div>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs
              title={t('dashboard.company', { count: 3 })}
              breadcrumbItem={t('companies.edit_company', {
                company: company.name,
              })}
            />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      {t('companies.edit_company', { company: company.name })}
                    </CardTitle>
                    <AvForm onValidSubmit={this.handleValidSubmit}>
                      {error ? (
                        <Alert color="danger">{t(`errors.${error}`)}</Alert>
                      ) : null}
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
                            value={company.name}
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
                            value={company.address}
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
                            value={company.enabled}
                            style={{ marginLeft: 0 }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label className="col-form-label col-lg-2">
                          {t('companies.logo')}
                        </Label>
                        <Col lg="10">
                          <Dropzone
                            onDrop={(acceptedFiles) =>
                              this.handleAcceptedFiles(acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                    </div>
                                    <h4>{t('companies.files')}</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {this.state.selectedFiles &&
                              this.state.selectedFiles.map((f, i) => {
                                return (
                                  <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + '-file'}
                                  >
                                    <div className="p-2">
                                      <Row className="align-items-center">
                                        <Col className="col-auto">
                                          <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                          />
                                        </Col>
                                        <Col>
                                          <Link
                                            to="#"
                                            className="text-muted font-weight-bold"
                                          >
                                            {f.name}
                                          </Link>
                                          <p className="mb-0">
                                            <strong>{f.formattedSize}</strong>
                                          </p>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Card>
                                );
                              })}
                          </div>
                        </Col>
                      </FormGroup>
                      <Row className="justify-content-end">
                        <Col lg="10">
                          <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                          >
                            {t('companies.edit_button')}
                            {loading && <Spinner color="info" size="sm" />}
                          </Button>{' '}
                          <Button
                            onClick={(e) => this.props.history.goBack()}
                            color="secondary"
                          >
                            {t('cancel')}
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
  const { error, loading, company } = state.Companies;
  return { error, loading, company };
};

export default compose(
  withRouter,
  connect(mapStatetoProps, { editCompany, getCompanyById }),
  withNamespaces()
)(CompaniesEdit);
