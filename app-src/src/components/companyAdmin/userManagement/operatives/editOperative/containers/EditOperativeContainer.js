import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditOperative from '../presentational/EditOperative';

class EditOperativeContainer extends Component {
    render = () => <EditOperative operativeName="##User Name##" />;
}

// const mapDispatchToProps = dispatch => ({
//    fetchSingleUser
// });

export default withRouter(connect(null)(EditOperativeContainer));
