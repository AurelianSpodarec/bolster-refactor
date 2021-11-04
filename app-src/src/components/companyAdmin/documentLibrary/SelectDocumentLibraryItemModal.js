import getDocumentsForAttachPin from 'actions/companyAdmin/documentLibrary/async/getDocumentsForAttachPin';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIconFromExt } from 'helpers/general';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import FileTypeIcon from './FileTypeIcon';
import { DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import { FILE_API_URL, RAW_S3_STORAGE_URL } from 'config';
import axios from 'axios';
import { getAuthHeader } from 'helpers/api';

const { FILE, FOLDER } = DOCUMENT_LIBRARY_TYPES;

const SelectDocumentLibraryItemModal = ({ handleChange, hideModal }) => {
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const fetching = useSelector(selectIsFetching);
    const items = useSelector(selectItems);

    const [chooseItemError, setChooseItemError] = useState(null);

    const [parentID, setParentID] = useState(null);

    const filteredItems = items.filter(item => item.parentFolderID === parentID); 
    console.log();

    useEffect(() => {
        dispatch(getDocumentsForAttachPin());
    }, []);

    console.log('hihihi');
    if (fetching) return (
        <ModalOuterContainer>
            <BlockHeading title="Select document from library" />
            <Loading />
        </ModalOuterContainer>
    );

    if (error || chooseItemError) return (
        <ModalOuterContainer>
            <BlockHeading title="Select document from library" />
            <Error>{error || chooseItemError}</Error>
        </ModalOuterContainer>
    );

    return (
        <ModalOuterContainer>
            <BlockHeading title="Select document from library" />
            <div className="select-document-library-items">
                {filteredItems.map(item => (
                    <div key={item.id} className="select-document-library-item" onClick={(e) => {
                        e.preventDefault();

                        if (item.type === FOLDER) setParentID(item.id);
                        else downloadFile(item);
                    }} >
                        <FileTypeIcon 
                            className="icon"
                            src={item.type === FILE 
                                ? getIconFromExt(item.fileExtension) 
                                : FolderIcon 
                            } 
                        />
                        {item.name}
                    </div>
                ))}
            </div>
        </ModalOuterContainer>
    );

    async function  downloadFile(item) {
        try {
            const res = await fetch(`${RAW_S3_STORAGE_URL}/${item.s3Key}`);
            console.log({res});
            const blob = await res.blob();
            console.log({blob});
    
            const formData = new FormData();
            formData.append('file', blob, item.name);
    
            const headers = {
                ...getAuthHeader(),
                'content-type': 'multipart/form-data',
            };
    
            const response = await axios.post(
                `${FILE_API_URL}?skipTemp=${true}`,
                formData,
                { headers },
            );
            const newS3Key = response.data.s3Key;
            handleChange(newS3Key);
            hideModal();
        
        } catch (err) {
            setChooseItemError(err.message);
            console.log({err});
        }
    }
};

const selectIsFetching = state => state.companyAdmin.documentLibraryReducer.isFetching;
const selectError = state => state.companyAdmin.documentLibraryReducer.fetchError;
// eslint-disable-next-line
const selectItems = state => Object.values(state.companyAdmin.documentLibraryReducer.documentLibrary);

export default SelectDocumentLibraryItemModal;
