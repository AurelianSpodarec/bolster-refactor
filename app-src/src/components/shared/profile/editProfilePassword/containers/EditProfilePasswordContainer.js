import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EditProfilePassword from '../presentational/EditProfilePassword';

class EditProfilePasswordContainer extends Component {
    render = () => <EditProfilePassword userName="##User Name##" />;
}

// const mapDispatchToProps = dispatch => ({
//    fetchSingleUser
// });

export default withRouter(connect(null)(EditProfilePasswordContainer));
