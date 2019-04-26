import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddServiceForm from '../presentational/AddServiceForm';
import createService from 'actions/superAdmin/services/async/createService';

class AddServiceFormContainer extends Component {
    state = {
        name: ''
    };

    render = () => (
        <AddServiceForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
        />
    );

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

    handleSubmit = e => {
        e.preventDefault();

        const { createService } = this.props;
        const { name } = this.state;

        createService({ name });
    };
}

const mapStateToProps = ({ superAdmin: { adminServicesReducer } }) => ({
    postSuccess: adminServicesReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    createService: postBody => {
        dispatch(createService(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddServiceFormContainer)
);
