import { useForm } from 'helpers/hooks';

const useCreateHierarchyAlert = () => {
    const [fields, handleChange] = useForm({
        name: '',
        description: '',
        deliveryMethod: [],
        date: '',
        recurrenceType: 0,
        recurrenceFrequency: 0,
    });

    const handleSubmit = () => {
        console.log('fields', fields);
    };

    return {
        fields,
        handleChange,
        handleSubmit,
    };
};

export default useCreateHierarchyAlert;
