import React from 'react';
import { connect } from 'react-redux';
import OtherOptions from '../presentational/OtherOptions';

const OtherOptionsContainer = () => {
    return <OtherOptions />;
};

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { options }
    }
}) => ({
    options
});

export default connect(mapStateToProps)(OtherOptionsContainer);
