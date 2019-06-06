import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestPage from 'components/frontEnd/request/presentational/RequestPage';

export class RequestPageContainer extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return <RequestPage />;
    }
}

export default connect()(RequestPageContainer);
