import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { STATUS_TO_STATS } from 'constants/companyAdmin/enums';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DrawingStats from '../presentational/DrawingStats';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';

class DrawingDetailsContainer extends Component {
    render() {
        const { drawing, stats, error, isFetching, onMobile, pins, getFilteredPins } = this.props;

        // Drawing uses filtered pins to display stats.

        const filteredStats = {
            // stats endpoint used
            lastUpdatedOn: stats.lastUpdatedOn,
            statuses: { ActionRequired: 0, Inspected: 0, Installed: 0, NoAction: 0, Other: 0 }
        };

        // compare stat count to filtered pin count to show ui filtered flag
        const statCount = stats.statuses
            ? Object.values(stats.statuses).reduce((acc, status) => {
                  acc += status;
                  return acc;
              }, 0)
            : 0;
        let filteredPinCount = 0;

        getFilteredPins(pins).forEach(pin => {
            filteredStats.statuses[STATUS_TO_STATS[pin.latestStatus]]++;
            filteredPinCount++;
        });

        const isFiltered = statCount !== filteredPinCount;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!drawing.id || !stats.statuses || !pins.length}
            >
                <DrawingStats
                    drawing={drawing}
                    isFiltered={isFiltered}
                    stats={filteredStats}
                    onMobile={onMobile}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { drawings, isFetching: fetchingDrawings, error: drawingsError },
            statsReducer: { stats, isFetching: fetchingStats, error: statsError },
            pinsReducer: { pins, isFetching: fetchingPins, error: pinsError }
        },
        shared: {
            mobileReducer: { onMobile }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id] || {},
    isFetching: fetchingDrawings || fetchingStats || fetchingPins,
    error: drawingsError || statsError || pinsError,
    stats,
    onMobile,
    id: match.params.id,
    pins: Object.values(pins)
    // operatives: Object.values(users),
});

export default withRouter(withUpdateOnChange(connect(mapStateToProps)(DrawingDetailsContainer)));
