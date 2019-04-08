import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createFloor from 'actions/companyAdmin/floors/async/createFloor';

import AddFloorForm from '../presentational/AddFloorForm';

class AddFloorFormContainer extends Component {
    state = {
        name: ''
    };
    render() {
        return (
            <AddFloorForm
                {...this.state}
                buildingID={this.props.buildingID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, updatedFloorID, history } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            return history.push(`/company/floors/${updatedFloorID}`);
        }
    };

    handleInputChange = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createFloor, buildingID } = this.props;

        createFloor({
            ...this.state,
            buildingID
        });
    };
}

const mapStateToProps = ({ companyAdmin: { floorsReducer } }, { match }) => ({
    postSuccess: floorsReducer.postSuccess,
    updatedFloorID: floorsReducer.updatedFloorID,
    buildingID: match.params.id
});

const mapDispatchToProps = dispatch => ({
    createFloor: postBody => {
        dispatch(createFloor(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddFloorFormContainer)
);
