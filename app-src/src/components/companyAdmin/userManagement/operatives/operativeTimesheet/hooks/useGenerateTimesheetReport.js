import { useForm } from 'helpers/hooks';

const useGenerateTimesheetReport = reportGenPins => {
    const [formData, handleChange] = useForm({
        isPDFGeneration: true,
        isCSVGeneration: false,
        isFloorplanGeneration: false,
        isOAndMManualGeneration: false,
        selectSortBy: 3,
        showHidden: false,
    });

    const handleSubmit = () => {
        console.log('submit', formData);
        // const hierarchyID = [...new Set(reportGenPins.map(({ drawingID }) => drawingID))];
        // const pinIDs = [...new Set(reportGenPins.map(({ pinID }) => pinID))];

        // const postBody = {
        //     hierarchyType: 'drawing',
        //     hierarchyID,
        //     pinIDs,
        //     isPDFGeneration: true,
        //     fromDateInclusive: startDate,
        //     toDateInclusive: moment(selectedDate).endOf(timePeriod).format(),
        //     sortBy: 3,
        //     reportHistories: 1,
        //     serviceID: serviceIDs,
        // };

        // dispatch(postReport(postBody));
    };

    return { formData, handleChange, handleSubmit };
};

export default useGenerateTimesheetReport;
