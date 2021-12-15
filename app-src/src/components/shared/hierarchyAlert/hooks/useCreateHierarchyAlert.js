import { useForm } from 'helpers/hooks';

const useCreateHierarchyAlert = () => {
    const [fields, handleChange] = useForm({
        name: '',
        description: '',
        deliveryMethod: 0,
        date: '',
        recurrence: 0,
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
