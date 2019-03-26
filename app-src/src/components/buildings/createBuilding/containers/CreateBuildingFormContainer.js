import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingForm from '../presentational/CreateBuildingForm';
import createBuilding from 'actions/buildings/async/createBuilding';

class CreateBuildingFormContainer extends Component {
    state = {
        name: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render() {
        return (
            <CreateBuildingForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                siteID={this.props.siteID}
            />
        );
    }

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const {
            name,
            addressLine1,
            addressLine2,
            postcode,
            client
        } = this.state;

        const postBody = {
            name: name,
            client: client,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            postcode: postcode,
            siteID: this.props.siteID
        };
        this.props.createBuilding(postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedBuildingID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/buildings/${updatedBuildingID}`);
        }
    };
}
const mapStateToProps = ({ buildingsReducer }, { match }) => ({
    postSuccess: buildingsReducer.postSuccess,
    error: buildingsReducer.error,
    siteID: match.params.id,
    updatedBuildingID: buildingsReducer.updatedBuildingID
});

const mapDispatchToProps = dispatch => ({
    createBuilding: postBody => {
        dispatch(createBuilding(postBody));
    }
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateBuildingFormContainer)
);
