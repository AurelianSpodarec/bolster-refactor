import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import fetchManufacturersByPinOptionType from 'actions/superAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

import PinOptionsManufacturers from '../presentational/PinOptionsManufacturers';

class PinOptionsManufacturersContainer extends Component {
    render() {
        const { type } = this.props;
        const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];

        return <PinOptionsManufacturers name={name} type={DROPDOWN_OPTION_LOOKUP[type]} />;
    }

    componentDidMount = () => {
        const {
            fetchManufacturersByPinOptionType,
            match: {
                params: { type },
            },
        } = this.props;
        fetchManufacturersByPinOptionType(DROPDOWN_OPTION_LOOKUP[type]);
    };
}

const mapStateToProps = (
    _,
    {
        match: {
            params: { type },
        },
    },
) => ({
    type,
});

const mapDispatchToProps = dispatch => ({
    fetchManufacturersByPinOptionType: type => {
        dispatch(fetchManufacturersByPinOptionType(type));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinOptionsManufacturersContainer);
