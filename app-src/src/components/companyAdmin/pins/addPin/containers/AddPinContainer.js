import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddPinFormContainer from 'components/shared/pins/addPin/containers/AddPinFormContainer';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';

class AddPinContainer extends Component {
    render() {
        const { drawingID } = this.props;

        return (
            <AddPinFormContainer
                hierarchyType="drawing"
                drawingID={drawingID}
            />
        );
    }

    componentDidMount = () => {
        const { drawingID, fetchDrawingTemplates } = this.props;

        fetchDrawingTemplates(drawingID);
    };
}

const mapStateToProps = (_, { match }) => ({
    drawingID: match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchDrawingTemplates: drawingID => {
        dispatch(fetchDrawingTemplates(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinContainer)
);
