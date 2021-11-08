import { useEffect } from 'react';
import { useForm, usePrevious } from 'helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import postBugReport from 'actions/companyAdmin/bugReports/postBugReport';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_SUBMIT, SUCCESS_MODAL } from 'constants/shared/modalTypes';

const useBugReport = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [form, handleChange] = useForm({
        accessCredentials: '',
        affectedUserCount: null,
        deviceDetails: '',
        appVersion: '',
        aboutDeviceScreenshot: '',
        browserUsed: '',
        systemPage: '',
        dateIssueOccurred: '',
        fullDescription: '',
        evidenceFile: '',
    });
    const { postSuccess, isPosting } = useSelector(mapStateToProps);
    const prevPostSuccess = usePrevious(postSuccess);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            const message =
                'Thank you for submitting the bug report. Our development team will investigate the issue shortly.';

            dispatch(showModal(SUCCESS_MODAL, { title: 'Success!', message }));

            history.push('/company');
        }
    }, [postSuccess, prevPostSuccess]);

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(postBugReport(form));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

const mapStateToProps = ({
    companyAdmin: {
        bugReportsReducer: { isPosting, error, postSuccess },
    },
}) => ({
    isPosting,
    error,
    postSuccess,
});

export default useBugReport;
