import { useState, useEffect, useMemo, useCallback } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { useForm, useQueryParam } from 'helpers/hooks';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { UPLOAD_LIBRARY_DOCUMENT } from 'constants/shared/modalTypes';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import axios from 'axios';

const useUploadFiles = (initialFiles = []) => {
    const maxFiles = 10;
    const maxFileSize = 5;

    const [error, setError] = useState(null);

    const prefix = useQueryParam('prefix') || '';
    const [files, setFiles] = useState(initialFiles);

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: [NativeTypes.FILE],
        drop: handleDrop,
        collect: handleCollect,
    });

    function handleDrop(item, monitor) {
        if (monitor) {
            const { files: newFiles} = monitor.getItem();

            handleChooseFiles(newFiles);

            setFiles([...files, ...newFiles]);
        }
    }

    function handleCollect(monitor) {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      }

    async function handlePress(e) {
        e.preventDefault();

        const newFiles = [...e.target.files];
        
        handleChooseFiles(newFiles);

        e.target.value = null;
        

        setFiles([...files, ...newFiles]);
    }

    async function handleChooseFiles(files){
        const filePrefix = prefix ? `${prefix}/` : '';

        try {
            const uploadUrls = await Promise.all(files.map(file => {
                const s3Key = `${filePrefix}/${file.name}`;
                return requestMediaURL(s3Key, file.type);
            }));
    
            console.log({uploadUrls});
            
        } catch (error) {
            setError(error.message);
        }
    }

    return {
        handlePress,
        dropRef,
        isActive: canDrop && isOver,
        progress: 0,
        files,
        error,
    };
};

const requestMediaURL = async (s3Key, fileType) => {
    const body = {
        key: s3Key,
        fileType,
    };

    const res = await axios.post(
        `${API_URL}/document-library/request-signed-s3-upload-url`,
        body,
        getHeaders());
    
        const { url } = res.data;
        return url;
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { isPosting, postError, postSuccess },
    },
}) => ({ isPosting, postError, postSuccess });


export default useUploadFiles;
