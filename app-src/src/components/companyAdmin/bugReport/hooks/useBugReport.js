import { useForm } from 'helpers/hooks';

const useBugReport = () => {
    const [form, handleChange] = useForm({
        companyName: '',
        accessCredentials: '',
        affectedUserCount: null,
        deviceManufacturer: '',
        deviceModel: '',
        appVersion: '',
        aboutDeviceScreenshot: '',
        browserUsed: '',
        systemPage: '',
        dateIssueOccured: '',
        fullDescription: '',
        evidenceFile: '',
    });

    //get company name from logged in user

    const handleSubmit = () => {
        console.log(form);
    };

    return { form, handleChange, handleSubmit };
};

export default useBugReport;
