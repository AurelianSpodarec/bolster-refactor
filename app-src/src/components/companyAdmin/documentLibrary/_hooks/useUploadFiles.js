import { useState  } from 'react';
import { useQueryParam } from 'helpers/hooks';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import axios from 'axios';
import uuid from 'uuid/v4';

const maxFileSizeMB = 5;

const useUploadFiles = (initialFiles = []) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const prefix = useQueryParam('prefix') || '';
    const [files, setFiles] = useState(initialFiles.map(addKeyToFileItem));

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: [NativeTypes.FILE],
        drop: handleDrop,
        collect: handleCollect,
    });

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

    async function handleSubmit(e){
        e.preventDefault();

        try {
            for (const file of files) {
                await uploadFile(file);
            }
        } catch (error) {
            setError(error.message);
            setProgress(0);
        }
    }

    async function uploadFile({ file, uuid }) {
        try {
            if (bytesToMB(file.size) > maxFileSizeMB) {
                const errorMessage = `You cannot upload a file larger than ${maxFileSizeMB}MB.`;
                setFiles(prev => prev.map(item => item.uuid === uuid 
                    ? ({ ...item, errorMessage })
                    : item));

                return;
              }
    
            const filePrefix = prefix ? `${prefix}/` : '';
    
            const key = `${filePrefix}${file.name}`;
            const { url, s3Key } = await requestMediaURL(key, file.type, file.size);
    
            const options = {
                onUploadProgress: handleUploadProgress,
                headers: { 
                    'Content-Type': file.type, 
                    'x-amz-acl': 'public-read', 
                },
            };
    
            await axios.put(url, file, options);
    
            await setTimeoutAsync(600);
            setProgress(0);
            
            setFiles(prev => prev.map(item => item.uuid === uuid 
                ? ({ ...item, uploaded: true, error: null }) 
                : item));

        } catch (err) {
            await setTimeoutAsync(600);
            setProgress(0);
            
            setFiles(prev => prev.map(item => item.uuid === uuid 
                ? ({ ...item, errorMessage: err.message }) 
                : item));
        }
    }

    function handleUploadProgress(e) {
        const percentComplete = Math.round((e.loaded * 100) / e.total);
        setProgress(percentComplete);
    }

    async function handleRemove(uuid) {
        const newFiles = files.filter((item) => item.uuid !== uuid);
       setFiles(newFiles);
    }

    return {
        handlePress,
        handleRemove,
        handleSubmit,
        dropRef,
        isActive: canDrop && isOver,
        files,
        error,
        progress,
        uploading: progress > 1,
    };
};

const requestMediaURL = async (s3Key, contentType, size) => {
    const url = `${API_URL}/document-library/request-signed-s3-upload-url`;
    const body = {
        key: s3Key,
        contentType,
        size,
    };

    const { data } = await axios.post(url, body, getHeaders());
    return data;
};

const setTimeoutAsync = async (wait) => {
    return new Promise(resolve => {
      setTimeout(resolve, wait);
    });
};

const addKeyToFileItem = (file) => {
    return {
        file,
        uuid: uuid(),
        uploaded: false,
    };
};

function bytesToMB(bytes) {
    return bytes / 1024 / 1024;
}


export default useUploadFiles;
