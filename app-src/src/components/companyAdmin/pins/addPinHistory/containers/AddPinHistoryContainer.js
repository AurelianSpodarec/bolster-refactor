import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import AddPinFormContainer from 'components/shared/pins/addPin/containers/AddPinFormContainer';

class AddPinHistoryContainer extends Component {
    render() {
        const { pinID } = this.props;

        return <AddPinFormContainer hierarchyType="pin" pinID={pinID} />;
    }

    componentDidMount = () => {
        const { pinID, fetchSinglePin, drawings, history } = this.props;
        fetchSinglePin(pinID);

        if (!drawings) {
            history.push(`/company/pins/${pinID}`);
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { drawings }
        }
    },
    { match: { params } }
) => ({
    pinID: params.id,
    drawings
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => {
        dispatch(fetchSinglePin(id));
    }
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinHistoryContainer);

export default withRouter(WithRedux);
