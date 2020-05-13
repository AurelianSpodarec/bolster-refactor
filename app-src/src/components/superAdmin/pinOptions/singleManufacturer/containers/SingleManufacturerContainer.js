import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fetchOptionValuesByManufacturer from 'actions/superAdmin/manufacturers/async/fetchOptionValuesByManufacturer';

// import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

class SingleManufacturerContainer extends Component {
    render() {
        const { type, manufacturerID } = this.props;
        // const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];

        console.error(type, manufacturerID);

        return <div>##this is the single manufacturer pin options page##</div>;
    }

    componentDidMount = () => {
        const { fetchOptionValuesByManufacturer, manufacturerID } = this.props;
        fetchOptionValuesByManufacturer(manufacturerID);
    };
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

const mapDispatchToProps = {
    fetchOptionValuesByManufacturer,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SingleManufacturerContainer),
);
