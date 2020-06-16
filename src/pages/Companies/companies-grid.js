import React, { Component } from 'react';
import { Container, Row, Spinner } from 'reactstrap';

//Import redux
import { connect } from 'react-redux';
import { compose } from 'redux';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Cards
import CardCompany from './card-company';

// Import actions
import { listCompanies } from '../../store/companies/actions';

//i18n
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';

class CompaniesGrid extends Component {
  componentDidMount() {
    this.props.listCompanies();
  }

  render() {
    const { companies } = this.props;

    const { t } = this.props;
    if (!companies)
      return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;
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
            <CardCompany companies={companies} path={this.props.match.path} />
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
export default compose(
  connect(mapPropsToState, { listCompanies }),
  withNamespaces(),
  withRouter
)(CompaniesGrid);
