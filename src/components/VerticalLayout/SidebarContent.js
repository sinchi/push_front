import React, { Component } from 'react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

//i18n
import { withNamespaces } from 'react-i18next';

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    new MetisMenu('#side-menu');

    var matchingMenuItem = null;
    var ul = document.getElementById('side-menu');
    var items = ul.getElementsByTagName('a');
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add('active');
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show');

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add('mm-active');
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t('Menu')}</li>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="bx bx-home-circle"></i>
                <span>{t('Dashboards')}</span>
              </Link>

              <Link to="/companies" className="waves-effect">
                <i className="bx bx-buildings"></i>
                <span>{t('dashboard.company', { count: 3 })}</span>
              </Link>

              <Link to="/applications" className="waves-effect">
                <i className="bx bx-store"></i>
                <span>
                  {this.props.t('dashboard.application', { count: 3 })}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNamespaces()(SidebarContent));
