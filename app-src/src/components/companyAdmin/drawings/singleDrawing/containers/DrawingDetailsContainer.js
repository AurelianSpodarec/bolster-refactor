import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DrawingStats from '../presentational/DrawingStats';

class DrawingDetailsContainer extends Component {
    render() {
        const { drawing, stats, error, isFetching, onMobile } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!drawing.id || !stats.statuses}
            >
                <DrawingStats
                    drawing={drawing}
                    stats={stats}
                    onMobile={onMobile}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    {
        companyAdmin: {
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
        },
        shared: {
            mobileReducer: { onMobile }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id] || {},
    isFetching: fetchingDrawings || fetchingStats,
    error: drawingsError || statsError,
    stats,
    onMobile,
    id: match.params.id
});

export default withRouter(connect(mapStateToProps)(DrawingDetailsContainer));
