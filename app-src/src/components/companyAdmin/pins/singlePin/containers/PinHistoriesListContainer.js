import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PinHistoriesList from '../presentational/PinHistoriesList';
import BlockHeadingWControls from 'components/shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';

const PinHistoriesListContainer = ({ histories, selectedHistoryId }) => {
    return (
        <>
            <BlockHeadingWControls title="Other pin histories">
                <button className="button red">
                    <i className="fa fa-trash" />
                    Delete all
                </button>
                <button className="button">
                    <i className="fa fa-plus" />
                    Add new history
                </button>
            </BlockHeadingWControls>
            <PinHistoriesList
                histories={histories.filter(
                    hist => hist.id !== selectedHistoryId
                )}
                historyCount={histories.length}
            />
        </>
    );
};

export default withRouter(
    connect(
        ({ companyAdmin: { pinsReducer, pinHistoriesReducer } }, { match }) => {
            return {
                isFetching: pinHistoriesReducer.isFetching,
                error: pinHistoriesReducer.error,
                histories: Object.values(
                    pinsReducer.pins[match.params.id].histories
                ),
                selectedHistoryId: pinHistoriesReducer.selectedHistoryId
            };
        }
    )(PinHistoriesListContainer)
);
