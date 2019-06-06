import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddPinFormContainer from 'components/shared/pins/addPin/containers/AddPinFormContainer';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';

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

const mapDispatchToProps = {
    fetchDrawingTemplates,
    fetchDrawingDropdownOptions
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinContainer)
);
