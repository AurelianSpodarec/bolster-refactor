import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingForm from '../presentational/CreateBuildingForm';
import createBuilding from 'actions/companyAdmin/buildings/async/createBuilding';

class CreateBuildingFormContainer extends Component {
    state = {
        name: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render = () => (
        <CreateBuildingForm
            {...this.state}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            siteID={this.props.siteID}
        />
    );

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { siteID, createBuilding } = this.props;
        const postBody = { ...this.state, siteID };
        createBuilding(postBody);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, updatedBuildingID } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/buildings/${updatedBuildingID}`);
        }
    };
}
const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { postSuccess, error, updatedBuildingID }
        }
    },
    { match: { params } }
) => ({
    postSuccess,
    error,
    siteID: params.id,
    updatedBuildingID
});

const mapDispatchToProps = dispatch => ({
    createBuilding: postBody => dispatch(createBuilding(postBody))
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateBuildingFormContainer)
);
