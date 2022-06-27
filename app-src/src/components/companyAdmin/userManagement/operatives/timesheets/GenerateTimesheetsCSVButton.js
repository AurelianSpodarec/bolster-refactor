import React from 'react';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { GENERATE_TIMESHEET_REPORT } from 'constants/shared/modalTypes';
import { selectTimesheetsReportDates } from 'selectors/companyAdmin/timesheets';

const GenerateTimesheetsCSVButton = () => {
    const dispatch = useDispatch();
    const { startDate, endDate } = useSelector(selectTimesheetsReportDates);

    const handlePress = () => {
        dispatch(
            showModal(GENERATE_TIMESHEET_REPORT, {
                fromDateInclusive: startDate,
                toDateInclusive: endDate,
            }),
        );
    };

    return (
        <ActionButton
            size="medium"
            onClick={handlePress}
            text="Export CSV"
            icon="file-csv"
            isPosting={false}
        />
    );
};

export default GenerateTimesheetsCSVButton;
