import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

import PinDetails from '../presentational/PinDetails';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import { componentDidMount } from '../../../../../helpers/generic';
import { usePrevious } from '../../../../../helpers/hooks';

const PinDetailsContainer = ({
    histories,
    users,
    services,
    error,
    isFetching,
    pin,
    isLoading,
    fetchingDrawings,
    drawingsError,
    drawing,
    postSuccess,
}) => {
    const { drawingID } = pin;
    const dispatch = useDispatch();
    componentDidMount(() => {
        if (drawingID) {
            dispatch(fetchSingleDrawing(drawingID));
        }
    });

    const prevProps = usePrevious({ postSuccess, pin });
    useEffect(() => {
        // redirect to drawing if deleting pin history has deleted pin
        const { drawingID } = prevProps.pin;
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(fetchSinglePin(pin.id)).then(({ error }) => {
                if (error) history.push(`/company/drawings/${drawingID}`);
            });
        }
    }, [postSuccess, prevProps.postSuccess]);

    const canAddPin = drawing?.accessType > ACCESS_TYPES_VALUES.VIEW_ONLY;
    const isBeforeExpiry = !!moment(Date.now()).isBefore(drawing.expiresOn);

    const sortedHistories = [...histories].sort(
        (a, b) => moment(b.createdOn) - moment(a.createdOn),
    );

    return sortedHistories.map((history, i) => {
        const isFirst = i === 0;
        return (
            <BlockContainer
                key={history.id}
                isEmpty={!Object.values(services).length || !histories.length}
                isFetching={isFetching || fetchingDrawings}
                error={error || drawingsError}
            >
                <BlockHeading classes="underline-full" title={`Pin ${pin.pinCode}`}>
                    <h4 className="small-text">
                        (History {histories.length - i} of {histories.length}{' '}
                        {histories.length - i === histories.length
                            ? ' - Latest'
                            : histories.length - i === 1
                            ? ' - Earliest'
                            : ''}
                        )
                    </h4>
                    {isFirst && isBeforeExpiry && canAddPin && (
                        <Link
                            className="button green"
                            style={{ marginBottom: '0.25em' }}
                            to={`/company/pins/${pin.id}/add-history`}
                        >
                            <i className="fa fa-plus" /> Add New History
                        </Link>
                    )}
                </BlockHeading>
                <PinDetails
                    pinHistory={histories.length - i}
                    history={history}
                    users={users}
                    services={services}
                    pin={pin}
                    drawingID={pin.drawingID}
                    historyCount={histories.length}
                    isLoading={isLoading}
                />
            </BlockContainer>
        );
    });
};

const mapStateToProps = (
    {
        companyAdmin: {
            pinsReducer: { isFetching: fetchingPins, postSuccess, singlePin },
            pinHistoriesReducer: { histories, isFetching: fetchingHistories, error },
            companyUsersReducer: { users, isFetching: fetchingUsers },
            servicesReducer: { services },
            drawingsReducer: { drawings, isFetching: fetchingDrawings, error: drawingsError },
        },
    },
    { match },
) => {
    const pin = singlePin[match.params.id] || {};
    return {
        isFetching: fetchingPins || fetchingHistories || fetchingUsers,
        error,
        latestHistoryId: pin.latestHistoryID,
        histories: Object.values(histories),
        users: users || {},
        services: services || {},
        pin,
        postSuccess,
        drawings,
        fetchingDrawings,
        drawingsError,
        drawing: drawings[pin?.drawingID] || {},
    };
};

export default withRouter(connect(mapStateToProps)(PinDetailsContainer));
