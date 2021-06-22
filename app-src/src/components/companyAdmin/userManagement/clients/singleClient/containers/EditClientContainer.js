import editClient from 'actions/companyAdmin/clients/async/editClient';
import fetchClientUsers from 'actions/companyAdmin/clients/async/fetchClientUsers';
import { useForm, usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import EditClient from '../presentational/EditClient';

const EditClientContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { clientUsers, postSuccess } = useSelector(mapStateToProps);
    const client = clientUsers[id];
    const [form, handleChange, setForm] = useForm({
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
    });
    const prevProps = usePrevious({ client, postSuccess });

    useEffect(() => {
        if (!client) {
            dispatch(fetchClientUsers());
        } else {
            setForm({
                firstName: client.firstName,
                lastName: client.lastName,
                companyName: client.companyName,
                phoneNumber: client.phoneNumber,
            });
        }
    }, [id]);

    useEffect(() => {
        if (client && !prevProps.client) {
            resetForm();
        }
    }, [client]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/users-management/clients');
        }
    }, [postSuccess]);

    const resetForm = () => {
        setForm({
            firstName: client.firstName,
            lastName: client.lastName,
            companyName: client.companyName,
            phoneNumber: client.phoneNumber,
        });
    };
    const handleSubmit = () => {
        dispatch(editClient(client.id, form));
    };

    return <EditClient {...form} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

const mapStateToProps = ({
    companyAdmin: {
        clientsReducer: { clientUsers, postSuccess },
    },
}) => ({ clientUsers, postSuccess });

export default EditClientContainer;
