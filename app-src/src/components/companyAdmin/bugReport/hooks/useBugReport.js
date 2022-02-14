import { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import postBugReport from 'actions/companyAdmin/bugReports/postBugReport';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

const useBugReport = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [form, handleChange] = useForm({
        accessCredentials: '',
        affectedUserCount: null,
        deviceDetails: '',
        appVersion: '',
        aboutDeviceScreenshots: '',
        browserUsed: '',
        systemPage: '',
        dateIssueOccurred: '',
        fullDescription: '',
        evidenceFiles: '',
        isReplicable: false,
    });

    const { postSuccess, isPosting, ticketReference } = useSelector(mapStateToProps);
    const prevPostSuccess = usePrevious(postSuccess);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess && ticketReference) {
            const message = `Thank you for submitting the bug report. Your ticket reference number is ${ticketReference}.`;

            dispatch(showModal(SUCCESS_MODAL, { title: 'Success!', message }));

            history.push('/company');
        }
    }, [postSuccess, prevPostSuccess, ticketReference]);

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(postBugReport(form));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

const mapStateToProps = ({
    companyAdmin: {
        bugReportsReducer: { isPosting, error, postSuccess, ticketReference },
    },
}) => ({
    isPosting,
    error,
    postSuccess,
    ticketReference,
});

export default useBugReport;
