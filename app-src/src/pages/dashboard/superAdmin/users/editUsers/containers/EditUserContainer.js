import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditUser from '../presentational/EditUser';

class EditUsersContainer extends Component {
    render = () => <EditUser />;
}

// const mapDispatchToProps = dispatch => ({
//    fetchSingleUser
// });

export default withRouter(connect(null)(EditUsersContainer));
