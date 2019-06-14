import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleFloor from '../presentational/SingleFloor';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import { APPROVED_COMPANIES_TABS } from 'constants/shared/tabNames';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

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
        setTabs(
            Object.values(APPROVED_COMPANIES_TABS),
            APPROVED_COMPANIES_TABS.LIST
        );
        fetchSingleFloor(floorID);
        fetchAllDrawings();
        fetchDocuments('floor', floorID);
        fetchPinStatsForLevel('floor', floorID);
    };

    componentWillUnmount = () => this.props.resetFilterOptions();
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['id']
});

const mapDispatchToProps = {
    fetchSingleFloor,
    fetchAllDrawings,
    fetchDocuments,
    fetchPinStatsForLevel,
    setTabs,
    resetFilterOptions
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);
