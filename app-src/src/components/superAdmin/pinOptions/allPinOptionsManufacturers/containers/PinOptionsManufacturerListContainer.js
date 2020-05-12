import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
// import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

import PinOptionsManufacturerList from '../presentational/PinOptionsManufacturerList';

class PinOptionsManufacturerListContainer extends Component {
    render() {
        // const { type } = this.props;
        // const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];

        // return <PinOptionsManufacturerList name={name} type={DROPDOWN_OPTION_LOOKUP[type]} />;
        return <PinOptionsManufacturerList />;
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
}

// const mapStateToProps = (
//     _,
//     {
//         match: {
//             params: { type },
//         },
//     },
// ) => ({
//     type,
// });

// const mapDispatchToProps = dispatch => ({
//     fetchAllDropdownOptions: type => {
//         dispatch(fetchAllDropdownOptions(type));
//     },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PinOptionsListContainer);
export default PinOptionsManufacturerListContainer;
