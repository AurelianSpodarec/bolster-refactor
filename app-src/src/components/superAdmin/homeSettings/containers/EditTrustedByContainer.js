import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/fetchAllTrustedBy';
import uploadFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/uploadTrustedBy';
import deleteFrontendTrustedBy from 'actions/superAdmin/frontendSite/trustedBySettings/async/deleteTrustedBy';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditTrustedBy from '../presentational/EditTrustedBy';
import { getOrderObjId } from 'helpers/generic';

const EditTrustedByContainer = () => {
    const dispatch = useDispatch();
    const { error, isFetching, trustedBy } = useSelector(
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

    const handleClearInput = field => {
        updateForm({ ...formValues, [field]: { name: '', value: '' } });
    };

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
        // handleClearInput(fieldName);
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
