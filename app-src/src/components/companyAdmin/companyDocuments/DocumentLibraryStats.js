import React from 'react';
import { formatBytes } from './CreateDocumentForm';
import useDocumentLibraryStorageInformation from './_hooks/useDocumentLibraryStorageInformation';

const DocumentLibraryStats = ({ items, isRoot }) => {
    const {
        totalStorageRemaining,
        totalStorageSizeForDownSync,
        totalStorageUsed,
        folderSize,
    } = useDocumentLibraryStorageInformation(items);

    const folderUsed = `${formatBytes(folderSize)} used (folder)`;
    const totalUsed = `${formatBytes(totalStorageUsed)} used (total)`;
    const totalRemaining = `${formatBytes(totalStorageRemaining)} remaining`;
    const neededForDownSync = `${formatBytes(totalStorageSizeForDownSync)} needed for downsync`;

    const usage = [totalUsed, totalRemaining, neededForDownSync];
    // only show folder usage if we're not on the root folder
    if (!isRoot) usage.unshift(folderUsed);
    const usageText = usage.join(' | ');

    return <span className="library-stats">{usageText}</span>;
};

export default DocumentLibraryStats;
