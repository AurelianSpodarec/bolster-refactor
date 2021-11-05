import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, usePrevious, useQueryParam } from 'helpers/hooks';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import axios from 'axios';
import uuid from 'uuid/v4';
import addDocumentLibraryItem from 'actions/companyAdmin/documentLibrary/sync/addDocumentLibraryItem';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

export const maxFileSizeMB = 5;

const useCreateDocument = (initialFiles = []) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [form, handleChange] = useForm({ isViewApp: false, isAttachPins: false });
    const dispatch = useDispatch();

    const prefix = useQueryParam('prefix') || '';
    const [files, setFiles] = useState(initialFiles.map(addKeyToFileItem));

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: [NativeTypes.FILE],
        drop: handleDrop,
        collect: handleCollect,
    });

    const validateFileSize = (file, uuid) => {
        if (bytesToMB(file.size) > maxFileSizeMB) {
            const errorMessage = `You cannot upload a file larger than ${maxFileSizeMB}MB.`;
            setFiles(prev =>
                prev.map(item => (item.uuid === uuid ? { ...item, errorMessage } : item)),
            );
            return false;
        }
        return true;
    };

    function handleDrop(item, monitor) {
        if (monitor) {
            const newFiles = [...monitor.getItem().files].map(addKeyToFileItem);
            setFiles(prev => prev.concat(newFiles));
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

        const newFiles = [...e.target.files].map(addKeyToFileItem);
        setFiles(prev => prev.concat(newFiles));

        e.target.value = null;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setFiles(files => files.map(file => ({ ...file, errorMessage: null })));

        let isFullSuccess = true;

        try {
            for (const file of files) {
                if (!file.uploaded) {
                    const success = await tryUploadFile(file);
                    if (!success) isFullSuccess = false;
                }
            }

            if (isFullSuccess) {
                setTimeout(() => dispatch(hideModal()), 500);
            }
        } catch (error) {
            setError(error.message);
            setProgress(0);
            isFullSuccess.current = false;
        }
    }

    async function tryUploadFile({ file, uuid }) {
        try {
            if (!validateFileSize(file, uuid)) return false;

            const filePrefix = prefix ? `${prefix}/` : '';

            const key = `${filePrefix}${file.name}`;

            const postBody = {
                key: key,
                contentType: file.type,
                size: file.size,
                isViewApp: form.isViewApp,
                isAttachPins: form.isAttachPins,
            };

            const { s3UploadURL, documentLibraryItem } = await postCreateItem(postBody);

            const options = {
                onUploadProgress: handleUploadProgress,
                headers: {
                    'Content-Type': file.type,
                    'x-amz-acl': 'public-read',
                },
            };

            await axios.put(s3UploadURL, file, options);

            await setTimeoutAsync(600);
            setProgress(0);

            setFiles(prev =>
                prev.map(item =>
                    item.uuid === uuid ? { ...item, uploaded: true, error: null } : item,
                ),
            );

            dispatch(addDocumentLibraryItem(documentLibraryItem));

            return true;
        } catch (err) {
            let message = err.message;
            if (typeof err.response?.data === 'string') message = err.response?.data;

            await setTimeoutAsync(600);
            setProgress(0);

            setFiles(prev =>
                prev.map(item => (item.uuid === uuid ? { ...item, errorMessage: message } : item)),
            );

            return false;
        }
    }

    function handleUploadProgress(e) {
        const percentComplete = Math.round((e.loaded * 100) / e.total);
        setProgress(percentComplete);
    }

    async function handleRemove(uuid) {
        const newFiles = files.filter(item => item.uuid !== uuid);
        setFiles(newFiles);
    }

    function handleCancel() {
        dispatch(hideModal());
    }

    const [initialCheckDone, setInitialCheckDone] = useState(false);
    const prevFiles = usePrevious(files);
    useEffect(() => {
        if (prevFiles.length !== files.length || !initialCheckDone) {
            for (const file of files) validateFileSize(file.file, file.uuid);
            if (!initialCheckDone) setInitialCheckDone(true);
        }
    }, [files]);

    return {
        handlePress,
        handleRemove,
        handleSubmit,
        handleCancel,
        dropRef,
        isActive: canDrop && isOver,
        files,
        error,
        progress,
        uploading: progress > 1,
        form,
        handleChange,
    };
};

const postCreateItem = async body => {
    const url = `${API_URL}/document-library/file`;
    const { data } = await axios.post(url, body, getHeaders());
    return data;
};

const setTimeoutAsync = async wait => {
    return new Promise(resolve => {
        setTimeout(resolve, wait);
    });
};

const addKeyToFileItem = file => {
    return {
        file,
        uuid: uuid(),
        uploaded: false,
    };
};

function bytesToMB(bytes) {
    return bytes / 1024 / 1024;
}

export default useCreateDocument;
