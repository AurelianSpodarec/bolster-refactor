import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    DROPDOWN_OPTION_LOOKUP,
    DROPDOWN_OPTIONS,
    DEFAULT_PIN_OPTIONS_SORT,
} from 'constants/companyAdmin/enums';

import fetchOptionValuesByManufacturer from 'actions/companyAdmin/manufacturers/async/fetchOptionValuesByManufacturer';
import fetchSingleManufacturer from 'actions/companyAdmin/manufacturers/async/fetchSingleManufacturer';

import SingleManufacturer from '../presentational/SingleManufacturer';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class SingleManufacturerContainer extends Component {
    state = {
        selectedSortValue: DEFAULT_PIN_OPTIONS_SORT.CUSTOM,
    };
    render() {
        const { manufacturerID, manufacturers, isFetching } = this.props;
        const { selectedSortValue } = this.state;
        const isManufacturerFetched = manufacturers.hasOwnProperty(manufacturerID) && !isFetching;

        return !isManufacturerFetched ? (
            <Loading />
        ) : (
            <SingleManufacturer
                manufacturers={manufacturers}
                manufacturerID={manufacturerID}
                handleSortChange={this.handleSortChange}
                selectedSortValue={selectedSortValue}
            />
        );
    }

    componentDidMount = () => {
        const {
            fetchOptionValuesByManufacturer,
            fetchSingleManufacturer,
            manufacturerID,
            type,
        } = this.props;
        fetchSingleManufacturer(manufacturerID, DROPDOWN_OPTION_LOOKUP[type]);
        fetchOptionValuesByManufacturer(manufacturerID);
    };

    handleSortChange = value => {
        this.setState({
            selectedSortValue: value,
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: { isFetching, error, manufacturers },
        },
    },
    {
        match: {
            params: { type, id },
        },
    },
) => {
    const pinOptionKey = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]].reduxKey;

    return {
        type,
        manufacturerID: id,
        isFetching,
        error,
        manufacturers: manufacturers[pinOptionKey] || {},
    };
};

const mapDispatchToProps = {
    fetchOptionValuesByManufacturer,
    fetchSingleManufacturer,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SingleManufacturerContainer),
);
