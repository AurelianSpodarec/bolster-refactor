import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleClientDrawing from 'actions/client/drawings/async/clientFetchSingleDrawing';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import SingleDrawing from '../presentational/SingleDrawing';
import { getSelectedCompanyForClient } from 'helpers/generic';

class SingleDrawingContainer extends Component {
    render = () => <SingleDrawing />;

    componentDidMount = () => {
        const { drawingID, fetchDrawingData } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchDrawingData(selectedCompanyID, drawingID);
    };
}

const mapDispatchToProps = dispatch => ({
    fetchDrawingData: (companyID, drawingID) => {
        dispatch(fetchSingleClientDrawing(companyID, drawingID));
        dispatch(fetchPins('drawing', drawingID));
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    (_, { match }) => ({ drawingID: match.params.id }),
    mapDispatchToProps
)(SingleDrawingContainer);
