import React from 'react';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { BOLSTER_PLUS_UPGRADE_MODAL, GENERATE_TIMESHEET_REPORT } from 'constants/shared/modalTypes';
import { selectTimesheetsReportDates } from 'selectors/companyAdmin/timesheets';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';

const GenerateTimesheetsCSVButton = () => {
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector(selectTimesheetsReportDates);
    const { isBolsterPlusActivated } = useBolsterPlus();

    const handlePress = () => {
        dispatch(
            showModal(GENERATE_TIMESHEET_REPORT, {
                fromDateInclusive: startDate,
                toDateInclusive: endDate,
            }),
        );
    };

    return isBolsterPlusActivated ? (
        <ActionButton
            size="medium"
            onClick={handlePress}
            text="Export CSV"
            icon="file-csv"
            isPosting={false}
        />
    ) : (
        <ActionButton
            size="medium"
            text="Export CSV"
            icon="file-csv"
            isPosting={false}
            onClick={() =>
                dispatch(
                    showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                        handleClose: () =>
                            dispatch(
                                showModal(BOLSTER_PLUS_UPGRADE_MODAL, {
                                    handleClose: () => {},
                                }),
                            ),
                    }),
                )
            }
        />
    );
};

export default GenerateTimesheetsCSVButton;
