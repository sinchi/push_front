import React, { Component } from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import CompaniesGrid from './companies-grid';
import CompaniesCreate from './companies-create';
import CompaniesEdit from './companies-edit';
import CompaniesOverview from './companies-overview';

import { Button } from 'reactstrap';

//i18n
import { withNamespaces } from 'react-i18next';

class Companies extends Component {
  render() {
    const { match, t } = this.props;
    const { path, url } = match;
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="clearfix" style={{ padding: '.5rem' }}>
            {url !== window.location.pathname && (
              <Link to={`${path}`}>
                <Button color="secondary" className="float-left">
                  {t('back')}
                </Button>
              </Link>
            )}
            <Link to={`${path}/create`}>
              <Button color="primary" className="float-right">
                {t('companies.add_company')}
              </Button>
            </Link>
          </div>

          <Switch>
            <Route exact path={path}>
              <CompaniesGrid />
            </Route>
            <Route path={`${path}/create`}>
              <CompaniesCreate />
            </Route>
            <Route path={`${path}/edit/:id`}>
              <CompaniesEdit {...this.props} />
            </Route>
            <Route path={`${path}/delete/:id`}></Route>
            <Route path={`${path}/:id`}>
              <CompaniesOverview {...this.props} />
            </Route>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(Companies);
