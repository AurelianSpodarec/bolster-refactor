import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/client/floors/async/clientFetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleFloor from '../presentational/SingleFloor';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import { FLOOR_TABS } from 'constants/shared/tabNames';

class SingleFloorContainer extends Component {
    render() {
        return <SingleFloor />;
    }

    componentDidMount = () => {
        const {
            floorID,
            fetchSingleFloor,
            fetchAllDrawings,
            fetchDocuments,
            fetchPinStatsForLevel,
            setTabs
        } = this.props;
        setTabs(Object.values(FLOOR_TABS), FLOOR_TABS.GENERAL_OVERVIEW);
        fetchSingleFloor(floorID);
        fetchAllDrawings();
        fetchDocuments('floor', floorID);
        fetchPinStatsForLevel('floor', floorID);
    };
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['id']
});

const mapDispatchToProps = {
    fetchSingleFloor,
    fetchAllDrawings,
    fetchDocuments,
    fetchPinStatsForLevel,
    setTabs
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);
