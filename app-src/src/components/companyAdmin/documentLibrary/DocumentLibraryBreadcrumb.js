import { stripS3Key } from 'helpers/general';
import React from 'react';
import { Link } from 'react-router-dom';

const DocumentLibraryBreadcrumb = ({ s3Key }) => {
    if (!s3Key) return <></>;
    const s3Arr = stripS3Key(s3Key).split('/');
    return (
        <div className="dl-breadcrumb">
            {s3Arr.map((item, i) => (
                <>
                    <Link
                        href={`/company/document-library/${s3Arr.slice(
                            0,
                            s3Arr.indexOf(item) + 1,
                        )}`}
                        title={item}
                    >{`${item}${i === s3Arr.length - 1 ? ' / ' : ''}`}</Link>
                </>
            ))}
        </div>
    );
};

export default DocumentLibraryBreadcrumb;
