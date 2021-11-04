import React from 'react';
import { formatBytes } from './CreateDocumentForm';
import useDocumentLibraryStorageInformation from './_hooks/useDocumentLibraryStorageInformation';

const DocumentLibraryStats = () => {
    const { storageInformation } = useDocumentLibraryStorageInformation();

    const {
        totalStorageRemaining,
        totalStorageSizeForDownSync,
        totalStorageUsed,
    } = storageInformation;

    return (
        <span className="library-stats">
            {formatBytes(totalStorageUsed)} used | {formatBytes(totalStorageRemaining)} remaining |{' '}
            {formatBytes(totalStorageSizeForDownSync)} needed for downsync
        </span>
    );
};

export default DocumentLibraryStats;
