import { useState, useEffect, useMemo, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useForm } from 'helpers/hooks';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { UPLOAD_LIBRARY_DOCUMENT } from 'constants/shared/modalTypes';

const useCreateLibraryDocument = () => {
    const maxFiles = 10;
    const maxFileSize = 5;
    const dispatch = useDispatch();
    const { isPosting, postError, postSuccess } = useSelector(mapStateToProps);

    const [showUploadModal, setShowUploadModal] = useState(false);

    const initialFormData = {
        urls: [],
        viewInApp: false,
        attachToPins: false,
    };
    const [formData, onChange] = useForm(initialFormData);

    const multiple = useMemo(() => maxFiles > 1, [maxFiles]);
    const formattedVal = useMemo(getFormattedUserValue, [formData.urls]);
    const memoizedOnChange = useCallback(onChange, []);

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: [NativeTypes.FILE],
        drop: handleDrop,
        collect: handleCollect,
    });

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [fileUrls, setFileUrls] = useState(formattedVal);

    useEffect(() => {
        if (multiple) {
            memoizedOnChange('urls', fileUrls);
        } else {
            const [firstItem = ''] = fileUrls;
            memoizedOnChange('urls', firstItem);
        }
    }, [fileUrls, memoizedOnChange, multiple]);

    async function handlePress(e) {
        const files = [...e.target.files];

        e.preventDefault();
        e.target.value = null;

        uploadFiles(files);
    }

    function handleDrop(item, monitor) {
        if (monitor) {
            const { files } = monitor.getItem();
            // uploadFiles(files);
            console.log(files);
            onChange('urls', files);
            handleShowModal();
        }
    }

    function handleShowModal() {
        dispatch(
            showModal(UPLOAD_LIBRARY_DOCUMENT, {
                name: 'urls',
                onChange,
                maxFiles,
                maxFileSize,
                canDrop,
                isOver,
                progress,
                error,
                handlePress,
                handleRemove,
                dropRef,
                isPosting,
                postError,
                postSuccess,
                showUploadModal,
                setShowUploadModal,
                formData,
                handleHideModal,
            }),
        );
    }

    function handleHideModal() {
        dispatch(hideModal());
    }

    async function uploadFiles(files) {
        for (const file of files) {
            await uploadFile(file);
        }
    }

    async function uploadFile(file) {
        if (!file) return;

        if (fileUrls.length > maxFiles) {
            setError(`You cannot upload more that ${maxFiles} files.`);
            return;
        }

        if (!file.type.includes('image')) {
            setError('You can only upload images.');
            return;
        }

        if (bytesToMB(file.size) > maxFileSize) {
            setError(`You cannot upload a file larger than ${maxFileSize}MB.`);
            return;
        }

        try {
            const s3Key = `${uuidv4()}/${file.name}`;
            // const { data: url } = await requestMediaURL(s3Key, file.type);

            // const options = {
            //     onUploadProgress: handleUploadProgress,
            //     headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' },
            // };

            // await axios.put(url, file, options);

            // setFileUrls(prev => prev.concat(s3Key));
            // await setTimeoutAsync(600);

            // setProgress(0);
        } catch (err) {
            setProgress(0);
        }
    }

    function handleUploadProgress(e) {
        const percentComplete = Math.round((e.loaded * 100) / e.total);
        setProgress(percentComplete);
    }

    function handleRemove(e, url) {
        e.preventDefault();
        setFileUrls(prev => prev.filter(cur => cur !== url));
    }

    function getFormattedUserValue() {
        if (multiple) return formData.urls;
        return formData.urls ? [formData.urls] : [];
    }

    function handleCollect(monitor) {
        return {
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        };
    }

    async function setTimeoutAsync(wait) {
        return new Promise(resolve => {
            setTimeout(resolve, wait);
        });
    }

    function bytesToMB(bytes) {
        return bytes / 1024 / 1024;
    }

    return {
        isPosting,
        postError,
        postSuccess,
        showUploadModal,
        setShowUploadModal,
        maxFiles,
        maxFileSize,
        canDrop,
        isOver,
        progress,
        error,
        formattedVal,
        handlePress,
        handleRemove,
        setTimeoutAsync,
        dropRef,
        onChange,
        formData,
        setProgress,
        handleShowModal,
        handleHideModal,
    };
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { isPosting, postError, postSuccess },
    },
}) => ({ isPosting, postError, postSuccess });

export default useCreateLibraryDocument;
