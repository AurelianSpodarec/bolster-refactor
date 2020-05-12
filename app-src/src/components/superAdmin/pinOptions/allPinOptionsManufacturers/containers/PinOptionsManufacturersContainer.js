import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
// import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

import PinOptionsManufacturers from '../presentational/PinOptionsManufacturers';

class PinOptionsManufacturersContainer extends Component {
    render() {
        const { type } = this.props;
        const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];

        return <PinOptionsManufacturers name={name} type={DROPDOWN_OPTION_LOOKUP[type]} />;
    }

    // componentDidMount = () => {
    //     const {
    //         fetchAllDropdownOptions,
    //         match: {
    //             params: { type },
    //         },
    //     } = this.props;
    //     fetchAllDropdownOptions(DROPDOWN_OPTION_LOOKUP[type]);
    // };
    // Todo: fetch manufacturer by pin option type - create actions and reducers for this
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

// const mapDispatchToProps = dispatch => ({
//     fetchAllDropdownOptions: type => {
//         dispatch(fetchAllDropdownOptions(type));
//     },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PinOptionsListContainer);
export default connect(mapStateToProps)(PinOptionsManufacturersContainer);
