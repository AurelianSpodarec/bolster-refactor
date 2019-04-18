import React, { Component } from 'react';
import HeadquartersCompanyListItem from '../presentational/HeadquartersCompanyListItem';

export default class HeadquartersCompanyListItemContainer extends Component {
    render() {
        return <HeadquartersCompanyListItem company={this.props.company} />;
    }
}
