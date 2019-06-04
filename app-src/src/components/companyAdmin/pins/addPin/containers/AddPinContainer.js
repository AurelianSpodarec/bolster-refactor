import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddPinFormContainer from 'components/shared/pins/addPin/containers/AddPinFormContainer';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

class AddPinContainer extends Component {
    render = () => (
        <AddPinFormContainer
            hierarchyType="drawing"
            drawingID={this.props.drawingID}
        />
    );

    componentDidMount = () => {
        const {
            drawingID,
            fetchDrawingTemplates,
            fetchDrawingDropdownOptions
        } = this.props;

        fetchDrawingTemplates(drawingID);
        fetchDrawingDropdownOptions(drawingID);
    };
}

const mapStateToProps = (_, { match }) => ({
    drawingID: match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchDrawingTemplates: drawingID => {
        dispatch(fetchDrawingTemplates(drawingID));
    },
    fetchDrawingDropdownOptions: drawingID => {
        dispatch(fetchDrawingDropdownOptions(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinContainer)
);
