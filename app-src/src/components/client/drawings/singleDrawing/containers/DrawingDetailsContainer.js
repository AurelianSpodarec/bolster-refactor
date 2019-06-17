import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DrawingStats from 'components/companyAdmin/drawings/singleDrawing/presentational/DrawingStats';

class DrawingDetailsContainer extends Component {
    render() {
        const { drawing, stats, error, isFetching } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!drawing.id || !stats.statuses}
            >
                <DrawingStats drawing={drawing} stats={stats} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    {
        client: {
            drawingsReducer: {
                drawings,
                isFetching: fetchingDrawings,
                error: drawingsError
            },
            statsReducer: {
                stats,
                isFetching: fetchingStats,
                error: statsError
            }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id] || {},
    isFetching: fetchingDrawings || fetchingStats,
    error: drawingsError || statsError,
    stats,
    id: match.params.id
});

export default withRouter(connect(mapStateToProps)(DrawingDetailsContainer));
