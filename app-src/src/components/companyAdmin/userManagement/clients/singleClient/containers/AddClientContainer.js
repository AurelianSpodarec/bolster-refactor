import addClientUser from 'actions/companyAdmin/clients/async/addClientUser';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AddClient from '../presentational/AddClient';

const AddClientContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, handleChange] = useForm({
        email: '',
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        drawingIDs: [],
        serviceIDs: [],
    });

    const {
        drawings,
        services,
        isPosting,
        postSuccess,
        error,
        subscriptionServiceIDs,
    } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ isPosting, postSuccess, error });
    useEffect(() => {
        dispatch(fetchAllDrawings());
    }, []);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/users-management/clients');
        }
    }, [postSuccess]);

    useEffect(() => {
        if (error && !prevProps.error) {
            dispatch(showModal(ERROR_MODAL, { message: error }));
        }
    }, [error]);

    const handleSubmit = () => {
        dispatch(addClientUser(state));
    };

    const drawingOptions = Object.values(drawings).map(drawing => ({
        value: drawing.id,
        label: drawing.name,
    }));
    const serviceOptions = Object.values(services)
        .filter(service => subscriptionServiceIDs.includes(service.id))
        .map(service => ({
            value: service.id,
            label: service.name,
        }));

    return (
        <AddClient
            {...state}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            drawingOptions={drawingOptions}
            serviceOptions={serviceOptions}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { drawings },
        servicesReducer: { services },
        clientsReducer: { isPosting, postSuccess, error },
        subscriptionsReducer: {
            subscriptions: { serviceIDs },
        },
    },
}) => ({ drawings, services, isPosting, postSuccess, error, subscriptionServiceIDs: serviceIDs });

export default AddClientContainer;
