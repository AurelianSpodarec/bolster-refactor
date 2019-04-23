import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import AddPinFormContainer from 'components/shared/pins/addPin/containers/AddPinFormContainer';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';

class AddPinHistoryContainer extends Component {
    render() {
        const { pinID } = this.props;

        return <AddPinFormContainer hierarchyType="pin" pinID={pinID} />;
    }

    componentDidMount = () => {
        const { pinID, fetchSinglePin, fetchDrawingTemplates } = this.props;
        fetchSinglePin(pinID).then(({ payload: { pin } }) =>
            fetchDrawingTemplates(pin.drawingID)
        );
    };
}

const mapStateToProps = (_, { match: { params } }) => ({
    pinID: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => {
        return dispatch(fetchSinglePin(id));
    },
    fetchDrawingTemplates: drawingID => {
        return dispatch(fetchDrawingTemplates(drawingID));
    }
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinHistoryContainer);

export default withRouter(WithRedux);
