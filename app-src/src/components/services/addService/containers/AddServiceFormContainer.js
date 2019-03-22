import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddServiceForm from '../presentational/AddServiceForm';
import createService from 'actions/services/async/createService';

class AddServiceFormContainer extends Component {
    state = {
        name: ''
    };
    render() {
        return (
            <AddServiceForm
                {...this.state}
                serviceID={this.props.serviceID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, updatedServiceID, history } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            return history.push(`/services/${updatedServiceID}`);
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createService, serviceID } = this.props;
        const { name } = this.state;

        createService({ serviceID, name });
    };
}

const mapStateToProps = ({ servicesReducer }, { match }) => ({
    postSuccess: servicesReducer.postSuccess,
    updatedServiceID: servicesReducer.updatedServiceID
    // ? What is the parent element of a service?
    // serviceID: match.params.buildingID
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
