import React, { Component } from 'react';

import Block1Filters from '../presentational/Block1Filters';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

// TODO: check if this export is being imported anywhere, this existing is making the auto-import  not bring in
// TODO: the higher order component and causing a hard to diagnose error.
// * IF this component is thorwing an error that says this$props$filters is undefined, check your import is not destructuring and is using the default export
export class Block1FiltersContainer extends Component {
    state = {
        showError: false
    };
    render() {
        const { fieldError, advanced, isFetching } = this.props;

        return (
            <Block1Filters
                fieldError={fieldError}
                advanced={advanced}
                isFetching={isFetching}
            />
        );
    }

    componentDidMount = () => {
        this._validate();
    };

    componentDidUpdate = prevProps => {
        const {
            filters: { siteID, companyUserIDs },
            showFieldError
        } = this.props;
        if (
            prevProps.filters.siteID !== siteID ||
            prevProps.filters.companyUserIDs.length !== companyUserIDs.length
        ) {
            this._validate();
            showFieldError();
        }
    };

    _validate = () => {
        const {
            filters: { siteID, companyUserIDs },
            validate
        } = this.props;

        if (!siteID && !companyUserIDs.length) {
            validate('You must select either a site or an operative.');
        } else {
            validate();
        }
    };
}

export default withUpdateOnChange(Block1FiltersContainer);
