import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

class SingleManufacturerContainer extends Component {
    render() {
        const { type, manufacturerID } = this.props;
        // const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];

        console.error(type, manufacturerID);

        return <div>##this is the single manufacturer pin options page##</div>;
    }

    // componentDidMount = () => {
    //     const {
    //         fetchManufacturersByPinOptionType,
    //         match: {
    //             params: { type },
    //         },
    //     } = this.props;
    //     fetchManufacturersByPinOptionType(DROPDOWN_OPTION_LOOKUP[type]);
    // };
}

const mapStateToProps = (
    _,
    {
        match: {
            params: { type, id },
        },
    },
) => ({
    type,
    manufacturerID: id,
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(mapStateToProps)(SingleManufacturerContainer);
