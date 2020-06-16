import React, { Component } from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { listCompanies } from '../../store/companies/actions';

import { withNamespaces } from 'react-i18next';
import { Spinner } from 'reactstrap';

class CompanySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
    };
    this.handleSelectedCompany = this.handleSelectedCompany.bind(this);
  }

  componentDidMount() {
    this.props.listCompanies();
  }

  handleSelectedCompany(company) {
    const { handleSelectGroup } = this.props;
    handleSelectGroup(company);
    console.log({ company });
    this.setState({ selectedGroup: company });
  }

  render() {
    const { selectedGroup } = this.state;
    const { t, id, name, companies } = this.props;
    if (!companies)
      return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;
    const optionGroup = companies.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    return (
      <Select
        id={id}
        value={selectedGroup}
        name={name}
        onChange={this.handleSelectedCompany}
        options={optionGroup}
        classNamePrefix="select2-selection"
        placeholder={t('companies.select')}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { error, loading, companies } = state.Companies;
  return { error, loading, companies };
};

export default compose(
  connect(mapStateToProps, { listCompanies }),
  withNamespaces()
)(CompanySelect);
