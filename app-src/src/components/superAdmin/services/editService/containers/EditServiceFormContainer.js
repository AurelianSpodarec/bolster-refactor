import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditServiceForm from '../presentational/EditServiceForm';

class EditServiceFormContainer extends Component {
    state = {
        name: ''
    };

    render = () => (
        <EditServiceForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
        />
    );

    componentDidMount = () => {};

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            return history.push('/admin/services');
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
}

const mapStateToProps = ({ superAdmin: { adminServicesReducer } }) => ({
    postSuccess: adminServicesReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditServiceFormContainer)
);
