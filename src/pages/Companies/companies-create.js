import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from 'reactstrap';

//Import Date Picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

class CompaniesCreate extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      selectedFiles: [],
    };
    this.startDateChange.bind(this);
    this.endDateChange.bind(this);
    this.handleAcceptedFiles.bind(this);
  }
  startDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  endDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

  handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    );

    this.setState({ selectedFiles: files });
    console.log(this.state.selectedFiles);
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
    const { t } = this.props;
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
                    <Form>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="companyname"
                          className="col-form-label col-lg-2"
                        >
                          {t('companies.company_name')}
                        </Label>
                        <Col lg="10">
                          <Input
                            id="companyname"
                            name="companyname"
                            type="text"
                            className="form-control"
                            placeholder={t('companies.company_placeholder')}
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
                          <textarea
                            className="form-control"
                            id="companyaddress"
                            rows="3"
                            placeholder={t('companies.address_placeholder')}
                          ></textarea>
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
                          <Input
                            id="companyenabled"
                            name="companyenabled"
                            type="checkbox"
                            style={{ marginLeft: 0 }}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          {t('companies.add_button')}
                        </Button>
                      </Col>
                    </Row>
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

export default withNamespaces()(CompaniesCreate);
