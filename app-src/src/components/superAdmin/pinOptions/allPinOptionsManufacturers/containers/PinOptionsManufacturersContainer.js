import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PIN_OPTION_TYPES_LOOKUP, PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';
import fetchManufacturersByPinOptionType from 'actions/superAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

import PinOptionsManufacturers from '../presentational/PinOptionsManufacturers';

class PinOptionsManufacturersContainer extends Component {
    render() {
        const { type } = this.props;
        const { name } = PIN_OPTION_TYPES[PIN_OPTION_TYPES_LOOKUP[type]];

        return <PinOptionsManufacturers name={name} type={PIN_OPTION_TYPES_LOOKUP[type]} />;
    }

    componentDidMount = () => {
        const { fetchManufacturersByPinOptionType, type } = this.props;
        fetchManufacturersByPinOptionType(PIN_OPTION_TYPES_LOOKUP[type]);
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
