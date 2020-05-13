import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import fetchOptionValuesByManufacturer from 'actions/superAdmin/manufacturers/async/fetchOptionValuesByManufacturer';
import fetchSingleManufacturer from 'actions/superAdmin/manufacturers/async/fetchSingleManufacturer';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';

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
            fetchAllServices,
            manufacturerID,
            type,
        } = this.props;
        fetchSingleManufacturer(manufacturerID, DROPDOWN_OPTION_LOOKUP[type]);
        fetchOptionValuesByManufacturer(manufacturerID);
        fetchAllServices();
    };
}

const mapStateToProps = (
    {
        superAdmin: {
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
    fetchAllServices,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SingleManufacturerContainer),
);
