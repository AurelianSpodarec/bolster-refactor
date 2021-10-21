import { useForm } from 'helpers/hooks';
import { useSelector } from 'react-redux';

const useBugReport = () => {
    const { name } = useSelector(mapStateToProps);

    const [form, handleChange] = useForm({
        companyName: name,
        accessCredentials: '',
        affectedUserCount: null,
        deviceDetails: '',
        appVersion: '',
        aboutDeviceScreenshot: '',
        browserUsed: '',
        systemPage: '',
        dateIssueOccured: '',
        fullDescription: '',
        evidenceFile: '',
    });

    const handleSubmit = () => {
        console.log(form);
    };

    return { form, handleChange, handleSubmit };
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { name },
        },
    },
}) => ({
    name,
});

export default useBugReport;
