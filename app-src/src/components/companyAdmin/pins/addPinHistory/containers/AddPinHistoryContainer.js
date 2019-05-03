import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import AddPinFormContainer from 'components/shared/pins/addPin/containers/AddPinFormContainer';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';

class AddPinHistoryContainer extends Component {
    render = () => (
        <AddPinFormContainer hierarchyType="pin" pinID={this.props.pinID} />
    );

    componentDidMount = async () => {
        const { pinID, fetchSinglePin, fetchDrawingTemplates } = this.props;
        const { payload } = await fetchSinglePin(pinID);
        fetchDrawingTemplates(payload.pin.drawingID);
    };
}

const mapStateToProps = (_, { match: { params } }) => ({
    pinID: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: pinID => dispatch(fetchSinglePin(pinID)),
    fetchDrawingTemplates: drawingID =>
        dispatch(fetchDrawingTemplates(drawingID))
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinHistoryContainer);

export default withRouter(WithRedux);
