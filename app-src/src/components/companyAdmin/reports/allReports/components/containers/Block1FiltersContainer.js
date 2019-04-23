import React, { Component } from 'react';
import { connect } from 'react-redux';

import Block1Filters from '../presentational/Block1Filters';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

const blockName = 'block1';
export class Block1FiltersContainer extends Component {
    state = {
        showError: false
    };
    render() {
        const { showError } = this.state;
        const { error, errorsVisible } = this.props;

        const showErr = showError || errorsVisible;
        return (
            <>
                <Block1Filters error={error} showErr={showErr} />
            </>
        );
    }

    componentDidMount = () => {
        this._validate();
    };

    componentDidUpdate = prev => {
        const { siteID, operativeIDs } = this.props;
        if (
            prev.siteID !== siteID ||
            prev.operativeIDs.length !== operativeIDs.length
        ) {
            this._validate();
            const { showError } = this.state;
            if (!showError) this.setState({ showError: true });
        }
    };

    _validate = () => {
        const {
            addFieldError,
            removeFieldError,
            siteID,
            operativeIDs
        } = this.props;

        if (!siteID && !operativeIDs.length)
            addFieldError(
                blockName,
                'You must select either a site or an operative.'
            );
        else removeFieldError(blockName);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters }
    },
    shared: {
        fieldErrorsReducer: { fieldErrors, errorsVisible }
    }
}) => ({
    siteID: filters.siteID,
    operativeIDs: filters.operativeIDs,
    error: fieldErrors[blockName],
    errorsVisible
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, val) => {
        dispatch(addFieldError(name, val));
    },
    removeFieldError: name => {
        dispatch(removeFieldError(name));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Block1FiltersContainer);
