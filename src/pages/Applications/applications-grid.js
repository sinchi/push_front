import React, { Component } from 'react';
import { Container, Row, Spinner } from 'reactstrap';

//Import redux
import { connect } from 'react-redux';
import { compose } from 'redux';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Cards
import CardApplication from './card-application';

// Import actions
import { listApplications } from '../../store/applications/actions';

//i18n
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';

class ApplicationsGrid extends Component {
  componentDidMount() {
    this.props.listApplications();
  }

  render() {
    const { t, language, applications } = this.props;

    if (!applications)
      return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;
    return (
      <React.Fragment>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title={t('dashboard.application', { count: 3 })}
            breadcrumbItem={t('dashboard.application_grid')}
          />

          <Row>
            {/* Import Cards */}
            <CardApplication
              applications={applications}
              path={this.props.match.path}
              language={language}
              t={t}
            />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapPropsToState = (state) => {
  const { loading, applications, error } = state.Applications;
  const { language } = state.Languages;
  return {
    loading,
    applications,
    error,
    language,
  };
};
export default compose(
  connect(mapPropsToState, { listApplications }),
  withNamespaces(),
  withRouter
)(ApplicationsGrid);
