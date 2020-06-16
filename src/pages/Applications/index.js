import React, { Component } from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import { compose } from 'redux';

import ApplicationGrid from './applications-grid';
import ApplicationsCreate from './applications-create';
/*import CompaniesEdit from './companies-edit';
import CompaniesOverview from './companies-overview'; */

import { Button } from 'reactstrap';

//i18n
import { withNamespaces } from 'react-i18next';

class Applications extends Component {
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
                {t('applications.add_application')}
              </Button>
            </Link>
          </div>

          <Switch>
            <Route exact path={path}>
              <ApplicationGrid />
            </Route>
            <Route path={`${path}/create`}>
              <ApplicationsCreate />
            </Route>
            {/*
            <Route path={`${path}/edit/:id`}>
              <CompaniesEdit {...this.props} />
            </Route>
            <Route path={`${path}/delete/:id`}></Route>
            <Route path={`${path}/:id`}>
              <CompaniesOverview {...this.props} />
            </Route> */}
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(withNamespaces())(Applications);
