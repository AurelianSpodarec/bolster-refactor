import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import AddPinHistoryFormContainer from './AddPinHistoryFormContainer';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';

class AddPinHistoryContainer extends Component {
    render = () => (
        <AddPinHistoryFormContainer
            hierarchyType="pin"
            pinID={this.props.pinID}
            isHistory
        />
    );

    componentDidMount = async () => {
        const { pinID, fetchSinglePin } = this.props;
        fetchSinglePin(pinID);
    };
}

const mapStateToProps = (_, { match: { params } }) => ({
    pinID: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: pinID => dispatch(fetchSinglePin(pinID))
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinHistoryContainer);

export default withRouter(WithRedux);
