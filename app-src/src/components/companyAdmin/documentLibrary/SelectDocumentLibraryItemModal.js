import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import getDocumentsForAttachPin from 'actions/companyAdmin/documentLibrary/async/getDocumentsForAttachPin';
import { getAuthHeader } from 'helpers/api';
import { getIconFromExt } from 'helpers/general';
import { FILE_API_URL, RAW_S3_STORAGE_URL } from 'config';
import { DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import FileTypeIcon from './FileTypeIcon';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import Error from 'components/shared/generic/misc/presentational/Error';
import {
    selectDocumentLibrary,
    selectDocumentLibraryFetchError,
    selectDocumentLibraryIsFetching,
} from 'selectors/documentLibrary';

const { FILE, FOLDER } = DOCUMENT_LIBRARY_TYPES;

const SelectDocumentLibraryItemModal = ({
    handleChange,
    hideModal,
    mimeTypes = ['application/pdf'],
}) => {
    const dispatch = useDispatch();

    const error = useSelector(selectDocumentLibraryFetchError);
    const fetching = useSelector(selectDocumentLibraryIsFetching);
    const items = Object.values(useSelector(selectDocumentLibrary));

    const [chooseItemError, setChooseItemError] = useState(null);

    const [parentID, setParentID] = useState(null);
    let filteredItems = items.filter(item => item.parentFolderID === parentID);

    if (mimeTypes.length > 0) {
        filteredItems = filteredItems.filter(item =>
            item.type === FOLDER ? item.areChildrenAttachPins : mimeTypes.includes(item.mimeType),
        );
    }

    useEffect(() => {
        dispatch(getDocumentsForAttachPin());
    }, []);

    const breadcrumbItems = getBreadcrumbItems(parentID);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Select document from library" />
            <p className="select-document-library-items-breadcrumb-items">
                <span
                    className="item"
                    onClick={() => {
                        setParentID(null);
                    }}
                >
                    Company files
                </span>
                {breadcrumbItems.map(({ text, value }) => (
                    <React.Fragment key={value}>
                        <span> / </span>
                        <span
                            className="item"
                            onClick={() => {
                                setParentID(value);
                            }}
                        >
                            {text}
                        </span>
                    </React.Fragment>
                ))}
            </p>
            <BlockContainer
                isEmpty={!filteredItems.length}
                isFetching={fetching}
                error={error}
                contentClass="no-padding"
            >
                <div className="select-document-library-items">
                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            className="select-document-library-item"
                            onClick={e => {
                                e.preventDefault();

                                if (item.type === FOLDER) setParentID(item.id);
                                else downloadFile(item);
                            }}
                        >
                            <FileTypeIcon
                                className="icon"
                                src={
                                    item.type === FILE
                                        ? getIconFromExt(item.fileExtension)
                                        : FolderIcon
                                }
                            />
                            {item.name}
                            <Error>{chooseItemError}</Error>
                        </div>
                    ))}
                </div>
            </BlockContainer>
        </ModalOuterContainer>
    );

    async function downloadFile(item) {
        try {
            const res = await fetch(`${RAW_S3_STORAGE_URL}/${item.s3Key}`);
            const blob = await res.blob();

            const formData = new FormData();
            formData.append('file', blob, item.name);

            const headers = {
                ...getAuthHeader(),
                'content-type': 'multipart/form-data',
            };

            const response = await axios.post(`${FILE_API_URL}?skipTemp=${true}`, formData, {
                headers,
            });
            const newS3Key = response.data.s3Key;
            handleChange(newS3Key);
            hideModal();
        } catch (err) {
            setChooseItemError(err.message);
        }
    }

    function getBreadcrumbItems() {
        const breadcrumbs = [];
        let parentFolderID = parentID;

        while (parentFolderID) {
            const parent = items.find(item => item.id === parentFolderID);
            breadcrumbs.push({ text: parent.name, value: parent.id });

            parentFolderID = parent.parentFolderID;
        }

        return breadcrumbs;
    }
};

export default SelectDocumentLibraryItemModal;
