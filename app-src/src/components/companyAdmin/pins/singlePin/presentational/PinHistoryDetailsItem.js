import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import PinSectionsContainer from '../containers/PinSectionsContainer';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import moment from 'moment';

const PinHistoryDetailsItem = ({
    history,
    services,
    handleEditHistoryModal,
    handleDeleteHistoryModal,
    editedByUserName,
    drawingID,
    isDeleteHistory,
    pin,
    templateName,
    canDeleteHistory,
    historyPinTask,
}) => (
    <div className="item">
        <FieldOutput
            title="Type"
            description={services[history.serviceID].name}
            sizeClass="size-lg-3 size-md-12"
        />

        <FieldOutput title="Template" description={templateName} sizeClass="size-lg-3 size-md-12" />

        <FieldOutput title="Date added" sizeClass="size-lg-3 size-md-12">
            <p>
                <DateTimeContainer date={history.createdOn} />
            </p>
        </FieldOutput>

        <FieldOutput
            title="Added by"
            description={`${history.createdByOperativeFullName} - ${history.formattedOperativeCode} (${history.createdByCompanyName})`}
            sizeClass="size-lg-3 size-md-12"
        />
        <FieldOutput
            title="Status"
            description={`${PIN_STATUS_TYPES[history.status]}`}
            sizeClass="size-lg-3 size-md-12"
        />
        <FieldOutput
            title="Last edited"
            description={
                history.lastEditedOn ? <DateTimeContainer date={history.lastEditedOn} /> : 'N/A'
            }
            sizeClass="size-lg-3 size-md-12"
        />
        <FieldOutput
            title="Last edited by"
            description={editedByUserName || 'N/A'}
            sizeClass="size-lg-3 size-md-12"
        />

        {!!history.restoredOn && (
            <>
                <FieldOutput
                    title="Date Restored"
                    description={<DateTimeContainer date={history.restoredOn} /> || 'N/A'}
                    sizeClass="size-lg-3 size-md-12"
                />

                <FieldOutput
                    title="Restored By"
                    description={history.restoredByCompanyUserName || 'N/A'}
                    sizeClass="size-lg-3 size-md-12"
                />
            </>
        )}

        {!!historyPinTask && (
            <FieldOutput
                title="Pin task"
                description={
                    <div className="history-pill-wrapper">
                        <div className="task-pill active">
                            <div
                                className={`square ${
                                    historyPinTask.actionedOn
                                        ? moment(historyPinTask.actionedOn).isAfter(
                                              historyPinTask.dueOn,
                                          )
                                            ? 'complete_late'
                                            : 'complete'
                                        : 'incomplete'
                                }`}
                            />
                            <div className="pill-title">
                                {historyPinTask.actionedOn
                                    ? moment(historyPinTask.actionedOn).isAfter(
                                          historyPinTask.dueOn,
                                      )
                                        ? 'Complete late'
                                        : 'Complete'
                                    : 'Incomplete'}
                            </div>
                        </div>
                        <div className="task-pill active">
                            <div
                                className={`square ${
                                    historyPinTask.isRecurring ? 'recurring' : 'non_recurring'
                                }`}
                            />
                            <div className="pill-title">
                                {historyPinTask.isRecurring ? 'Recurring' : 'Non-recurring'}
                            </div>
                        </div>
                    </div>
                }
                sizeClass="size-lg-3 size-md-12"
            />
        )}

        <PinSectionsContainer pinHistory={history} drawingID={drawingID} />

        <BlockButtonWrapper additionalClasses="item-button-container" sizeClasses="size-lg-12">
            {canDeleteHistory ? (
                <button className="button red " onClick={handleDeleteHistoryModal}>
                    <i className="far fa-trash" /> Delete Pin History
                </button>
            ) : (
                <TooltipContainer
                    side="top"
                    text="You cannot delete a pin history which has been created by another company"
                >
                    <button className="button red disabled" disabled>
                        <i className="far fa-trash" /> Delete Pin History
                    </button>
                </TooltipContainer>
            )}

            {pin && pin.isEditButtonEnabled && (
                <button className="button yellow" onClick={handleEditHistoryModal}>
                    <i className="far fa-pencil" /> Edit this history
                </button>
            )}
        </BlockButtonWrapper>
    </div>
);

export default PinHistoryDetailsItem;
