import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditServiceForm from '../presentational/EditServiceForm';

import fetchSingleService from 'actions/superAdmin/services/async/fetchSingleService';
import editService from 'actions/superAdmin/services/async/editService';

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

    componentDidMount = () => {
        this.props.fetchSingleService(this.props.id);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, isFetching, service } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            return history.push('/admin/services');
        }
        if (!isFetching && prevProps.isFetching) {
            this.setState({
                name: service.name
            });
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.editService(this.props.id, this.state.name);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            adminServicesReducer: { isFetching, postSuccess, adminServices }
        }
    },
    {
        match: {
            params: { id }
        }
    }
) => ({
    isFetching,
    postSuccess,
    id,
    service: adminServices[id]
});

const mapDispatchToProps = dispatch => ({
    fetchSingleService: id => {
        dispatch(fetchSingleService(id));
    },
    editService: (id, name) => {
        dispatch(editService(id, name));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditServiceFormContainer)
);
