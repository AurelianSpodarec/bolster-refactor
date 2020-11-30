import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/fetchAllTrustedBy';
import uploadFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/uploadTrustedBy';
import deleteFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/deleteTrustedBy';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { getOrderObjId } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditTrustedBy from '../presentational/EditTrustedBy';

const EditTrustedByContainer = () => {
    const dispatch = useDispatch();
    const { error, isFetching, trustedBy, postSuccess } = useSelector(
        ({ superAdmin: { frontendTrustedBySettingsReducer } }) => frontendTrustedBySettingsReducer,
    );

    const [formValues, updateForm] = useState({
        trustedBy0: { name: '', file: '' },
        trustedBy1: { name: '', file: '' },
        trustedBy2: { name: '', file: '' },
        trustedBy3: { name: '', file: '' },
        trustedBy4: { name: '', file: '' },
    });

    const handleUploadChange = (field, value) => {
        updateForm({ ...formValues, [field]: { ...formValues[field], file: value } });
    };

    const handleTextChange = (field, value) => {
        updateForm({ ...formValues, [field]: { ...formValues[field], name: value } });
    };

    const handleInitial = useCallback(
        value => {
            updateForm(value);
        },
        [updateForm],
    );

    const handleSubmit = event => {
        const fieldName = event.target.classList[1];
        const { name, file } = formValues[fieldName];
        if (!file) return;

        const orderNumber = Number(fieldName.slice(fieldName.length - 1)) + 1;
        const deleteId = getOrderObjId(trustedBy, orderNumber);

        const body = {
            Name: name || 'Temp Name',
            S3Key: file,
            Order: orderNumber,
        };

        if (deleteId) {
            dispatch(deleteFrontendTrustedBy(deleteId));
        }

        dispatch(uploadFrontendTrustedBy(body));
    };

    const handleSuccess = () => {
        dispatch(showModal(SUCCESS_MODAL, { message: 'Successfully saved Trusted By Logo' }));
    };
    const handleError = () => {
        dispatch(
            showModal(ERROR_MODAL, {
                message: 'Something went wrong saving this logo, please try again.',
            }),
        );
    };

    useEffect(() => {
        if (!trustedBy || !trustedBy.length) {
            dispatch(fetchFrontendTrustedBy());
        }
    }, []);

    useEffect(() => {
        if (trustedBy) {
            const initialObj = trustedBy.reduce((result, item, index) => {
                if (!item) return;
                return {
                    ...result,
                    [`trustedBy${index}`]: {
                        name: item.name,
                        file: item.s3Key,
                    },
                };
            }, {});
            handleInitial(initialObj);
        }
    }, [trustedBy]);

    const prevProps = usePrevious({ postSuccess, error });
    useEffect(() => {
        if (!prevProps.postSuccess && postSuccess) {
            handleSuccess();
        } else if (!prevProps.error && error) {
            handleError();
        }
    }, [postSuccess, error]);

    return (
        <>
            <PageHeading title="Trusted By Settings" withBackButton />
            <Block>
                <BlockContainer isFetching={isFetching} error={error}>
                    <EditTrustedBy
                        values={formValues}
                        handleUploadChange={handleUploadChange}
                        handleTextChange={handleTextChange}
                        handleSubmit={handleSubmit}
                    />
                </BlockContainer>
            </Block>
        </>
    );
};

export default EditTrustedByContainer;
