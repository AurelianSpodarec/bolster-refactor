import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import fetchOptionValuesByManufacturer from 'actions/companyAdmin/manufacturers/async/fetchOptionValuesByManufacturer';
import fetchSingleManufacturer from 'actions/companyAdmin/manufacturers/async/fetchSingleManufacturer';

import SingleManufacturer from '../presentational/SingleManufacturer';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class SingleManufacturerContainer extends Component {
    render() {
        const { manufacturerID, manufacturers, isFetching } = this.props;

        const isManufacturerFetched = manufacturers.hasOwnProperty(manufacturerID) && !isFetching;

        return !isManufacturerFetched ? (
            <Loading />
        ) : (
            <SingleManufacturer manufacturers={manufacturers} manufacturerID={manufacturerID} />
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
