import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';

import UserDrawingListItemContainer from '../containers/UserDrawingListItemContainer';
import { REMOVE_DRAWINGS_ACCESS } from 'constants/shared/modalTypes';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';

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
    drawingServices,
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
            <ButtonWrapper alignment="right">
                <ActionButton
                    text="Select All"
                    onClick={() => selectAll()}
                    size="small"
                    icon="arrows-rotate"
                    source="secondary"
                    ambient="positive"
                />

                {!!checkedDrawings.length && (
                    <ActionButton
                        text="Remove"
                        onClick={() =>
                            showModal(REMOVE_DRAWINGS_ACCESS, {
                                checkedDrawings: checkedDrawings,
                                userID: userID,
                            })
                        }
                        size="small"
                        icon="trash"
                    />
                )}
            </ButtonWrapper>
        </div>
    </>
);

export default UserDrawingsTable;
