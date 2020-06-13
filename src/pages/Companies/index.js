import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

class Company extends Component {
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={t('Dashboard')}
              breadcrumbItem={t('dashboard.company', { count: 3 })}
            />
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(Company);
