import React from 'react';
import { formatBytes } from './createDocument/CreateDocumentForm';
import useDocumentLibraryStorageInformation from './_hooks/useDocumentLibraryStorageInformation';
import InfoIcon from '../../../_content/images/icons/info-icon.svg';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const DocumentLibraryStats = ({ items, isRoot }) => {
    const { totalStorageRemaining, totalStorageSizeForDownSync, totalStorageUsed, folderSize } =
        useDocumentLibraryStorageInformation(items);

    const folderUsed = `${formatBytes(folderSize)} used (folder)`;
    const totalUsed = `${formatBytes(totalStorageUsed)} used (total)`;
    const totalRemaining = `${formatBytes(totalStorageRemaining)} remaining`;
    const neededForDownSync = `${formatBytes(totalStorageSizeForDownSync)} needed for downsync`;

    const usage = [totalUsed, totalRemaining, neededForDownSync];
    // only show folder usage if we're not on the root folder
    if (!isRoot) usage.unshift(folderUsed);
    const usageText = usage.join(' | ');

    return (
        <>
            <span className="library-stats">{usageText}</span>
            <TooltipContainer
                side="bottom"
                text="The default data limit for all Bolster users is 1064 MB (1GB). Bolster Plus increases this limit to 25GB. You can find more information about Bolster Plus by clicking on this icon."
            >
                <a href="/company/subscription" className="link-without-decoration text-colour">
                    <img src={InfoIcon} alt="Info icon" style={{ marginLeft: '10px' }} />
                </a>
            </TooltipContainer>
        </>
    );
};

export default DocumentLibraryStats;
