import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Block1Filters from '../presentational/Block1Filters';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

export class Block1FiltersContainer extends Component {
    state = {
        showError: false
    };
    render() {
        const { fieldError } = this.props;

        return <Block1Filters fieldError={fieldError} />;
    }

    componentDidMount = () => {
        this._validate();
    };

    componentDidUpdate = prev => {
        const {
            filters: { siteID, operativeIDs },
            showFieldError
        } = this.props;
        if (
            prev.filters.siteID !== siteID ||
            prev.filters.operativeIDs.length !== operativeIDs.length
        ) {
            this._validate();
            showFieldError();
        }
    };

    _validate = () => {
        const {
            filters: { siteID, operativeIDs },
            validate
        } = this.props;

        if (!siteID && !operativeIDs.length) {
            validate('You must select either a site or an operative.');
        } else {
            validate();
        }
    };
}

export default withUpdateOnChange(Block1FiltersContainer);
