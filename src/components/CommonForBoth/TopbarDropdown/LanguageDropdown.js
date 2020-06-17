import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

//i18n
import { withNamespaces } from 'react-i18next';

// falgs
import usFlag from '../../../assets/images/flags/us.jpg';
import spain from '../../../assets/images/flags/spain.jpg';
import germany from '../../../assets/images/flags/germany.jpg';
import italy from '../../../assets/images/flags/italy.jpg';
import russia from '../../../assets/images/flags/russia.jpg';
import french from '../../../assets/images/flags/french.jpg';

//Redux
import { connect } from 'react-redux';
import { compose } from 'redux';

//actions
import { setLanguage } from '../../../store/translation/actions';

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng: 'Francais',
      flag: french,
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction = this.changeLanguageAction.bind(this);
  }

  changeLanguageAction = (lng) => {
    this.props.setLanguage(lng);

    if (lng === 'sp') this.setState({ lng: 'Spanish', flag: spain });
    else if (lng === 'gr') this.setState({ lng: 'German', flag: germany });
    else if (lng === 'rs') this.setState({ lng: 'Russian', flag: russia });
    else if (lng === 'it') this.setState({ lng: 'Italian', flag: italy });
    else if (lng === 'eng') this.setState({ lng: 'English', flag: usFlag });
    else if (lng === 'fr') this.setState({ lng: 'Francais', flag: french });
  };

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle className="btn header-item waves-effect" tag="button">
            <img
              src={this.state.flag}
              alt="Skote"
              height="16"
              className="mr-1"
            />
            <span className="align-middle">{this.state.lng}</span>
          </DropdownToggle>
          <DropdownMenu className="language-switch" right>
            <DropdownItem
              tag="a"
              href="#"
              onClick={() => this.changeLanguageAction('fr')}
              className="notify-item"
            >
              <img src={french} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Francais</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="#"
              onClick={() => this.changeLanguageAction('eng')}
              className="notify-item"
            >
              <img src={usFlag} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">English</span>
            </DropdownItem>
            {/* <DropdownItem
              tag="a"
              href="#"
              onClick={() => this.changeLanguageAction('sp')}
              className="notify-item"
            >
              <img src={spain} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Spanish</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="#"
              onClick={() => this.changeLanguageAction('gr')}
              className="notify-item"
            >
              <img src={germany} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">German</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="#"
              onClick={() => this.changeLanguageAction('it')}
              className="notify-item"
            >
              <img src={italy} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Italian</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="#"
              onClick={() => this.changeLanguageAction('rs')}
              className="notify-item"
            >
              <img src={russia} alt="Skote" className="mr-1" height="12" />
              <span className="align-middle">Russian</span>
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { language } = state.Languages;
  return { language };
};
export default compose(
  withNamespaces(),
  connect(mapStateToProps, { setLanguage })
)(LanguageDropdown);
