import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';

import UserDrawingListItemContainer from '../containers/UserDrawingListItemContainer';
import { REMOVE_DRAWINGS_ACCESS } from 'constants/shared/modalTypes';

const UserDrawingsTable = ({
    headers,
    drawings,
    isFetching,
    error,
    checkedDrawings,
    handleDrawingIDs,
    userID,
    showModal,
    selectAll,
    drawingServices
}) => (
        <>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!drawings.length || !drawingServices.length}
                noDataMessage="No drawings to display."
            >
                {drawings.map(drawing => (
                    <UserDrawingListItemContainer
                        checkedDrawings={checkedDrawings}
                        key={drawing.id}
                        drawing={drawing}
                        handleDrawingIDs={handleDrawingIDs}
                    />
                ))}
            </Table>
            <div className="button-container">
                {!!checkedDrawings.length && (
                    <button
                        className="button red pull-right"
                        onClick={() =>
                            showModal(REMOVE_DRAWINGS_ACCESS, {
                                checkedDrawings: checkedDrawings,
                                userID: userID
                            })
                        }
                    >
                        <i className="far fa-trash-alt" /> Remove Access
                    </button>
                )}

                <button className="button yellow pull-right" onClick={() => selectAll()}>
                    <i className="far fa-check-square" /> Select All
            </button>
            </div>
        </>
    );

export default UserDrawingsTable;
