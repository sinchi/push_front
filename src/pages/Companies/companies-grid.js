import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

//Import redux
import { connect } from 'react-redux';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Cards
import CardCompany from './card-company';

// Import actions
import { listCompanies } from '../../store/companies/actions';

//i18n
import { withNamespaces } from 'react-i18next';

class CompaniesGrid extends Component {
  componentDidMount() {
    this.props.listCompanies();
  }

  render() {
    const { companies } = this.props;

    const { t } = this.props;
    return (
      <React.Fragment>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title={t('dashboard.company', { count: 3 })}
            breadcrumbItem={t('dashboard.company_grid')}
          />

          <Row>
            {/* Import Cards */}
            <CardCompany companies={companies} />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapPropsToState = (state) => {
  const { loading, companies, error } = state.Companies;
  return {
    loading,
    companies,
    error,
  };
};

export default connect(mapPropsToState, { listCompanies })(
  withNamespaces()(CompaniesGrid)
);
