import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import fetchOptionValuesByManufacturer from 'actions/companyAdmin/manufacturers/async/fetchOptionValuesByManufacturer';
import fetchSingleManufacturer from 'actions/companyAdmin/manufacturers/async/fetchSingleManufacturer';

import SingleManufacturer from '../presentational/SingleManufacturer';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import toggleIsSorting from 'actions/shared/sort/toggleIsSorting';
import setIsSorting from 'actions/shared/sort/setIsSorting';

class SingleManufacturerContainer extends Component {
    render() {
        const {
            manufacturerID,
            manufacturers,
            isFetching,
            isSorting,
            toggleIsSorting,
        } = this.props;
        const isManufacturerFetched = manufacturers.hasOwnProperty(manufacturerID) && !isFetching;

        return !isManufacturerFetched ? (
            <Loading />
        ) : (
            <SingleManufacturer
                manufacturers={manufacturers}
                manufacturerID={manufacturerID}
                isSorting={isSorting}
                toggleIsSorting={toggleIsSorting}
            />
        );
    }

    componentDidMount = () => {
        const {
            fetchOptionValuesByManufacturer,
            fetchSingleManufacturer,
            manufacturerID,
            type,
            setIsSorting,
        } = this.props;
        fetchSingleManufacturer(manufacturerID, DROPDOWN_OPTION_LOOKUP[type]);
        fetchOptionValuesByManufacturer(manufacturerID);
        setIsSorting(false);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersReducer: { isFetching, error, manufacturers },
        },
        shared: {
            sortReducer: { isSorting },
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
        isSorting,
    };
};

const mapDispatchToProps = {
    fetchOptionValuesByManufacturer,
    fetchSingleManufacturer,
    toggleIsSorting,
    setIsSorting,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SingleManufacturerContainer),
);
