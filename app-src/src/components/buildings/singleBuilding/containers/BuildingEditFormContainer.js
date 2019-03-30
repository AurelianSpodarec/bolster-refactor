import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BuildingEditForm from '../presentational/BuildingEditForm';
import editbuilding from 'actions/buildings/async/editBuilding';

class BuildingEditFormContainer extends Component {
    state = {
        name: '',
        client: '',
        addressLine1: '',
        addressLine2: '',
        postcode: ''
    };

    render() {
        return (
            <BuildingEditForm
                {...this.state}
                buildingID={this.props.buildingID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
    componentDidUpdate = prevProps => {
        const { postSuccess, history, buildingID, building } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/buildings/${buildingID}`);
        }
        if (!prevProps.building.id && !!building.id) {
            this._setFormDetails();
        }
    };

    componentDidMount = () => {
        const { building } = this.props;

        if (building.id > 0) {
            this._setFormDetails();
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    //_ <-- used because this helper function is only for this class - not shared or used within the children
    _setFormDetails = () => {
        const { building } = this.props;

        this.setState({
            name: building.name,
            client: building.client,
            addressLine1: building.addressLine1,
            addressLine2: building.addressLine2,
            postcode: building.postcode
        });
    };

    //write a "helper" function that will update state with building details.
    //if !building.id is empty/unidentified (!building.id is equal to unidentified, which is a falsey) and now no longer empty

    handleSubmit = e => {
        e.preventDefault();

        const {
            name,
            client,
            addressLine1,
            addressLine2,
            postcode
        } = this.state;

        const postBody = {
            name: name,
            client: client,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            postcode: postcode
        };

        this.props.editbuilding(postBody);
    };
}

const mapStateToProps = ({ buildingsReducer }, ownProps) => ({
    postSuccess: buildingsReducer.postSuccess,
    error: buildingsReducer.error,
    buildingID: ownProps.match.params.id,
    building: buildingsReducer.buildings[ownProps.match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    editbuilding: postBody => {
        dispatch(editbuilding(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingEditFormContainer)
);
