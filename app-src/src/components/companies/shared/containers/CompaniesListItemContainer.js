import React, { Component } from 'react';
import CompaniesListItem from '../presentational/CompaniesListItem';

class CompaniesListItemContainer extends Component {
    render() {
        const { company, colCount } = this.props;
        return <CompaniesListItem company={company} colCount={colCount} />;
    }
}

export default CompaniesListItemContainer;
