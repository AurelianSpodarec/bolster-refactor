import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FrontEndFooter from '../presentational/FrontEndFooter';

const FrontEndFooterContainer = ({ hideHeader }) => {
    return <FrontEndFooter hideFooter={hideHeader} />;
};

const mapStateToProps = ({
    frontEnd: {
        layoutReducer: {
            layout: { hideHeader },
        },
    },
}) => ({
    hideHeader,
});

export default withRouter(connect(mapStateToProps, null)(FrontEndFooterContainer));
