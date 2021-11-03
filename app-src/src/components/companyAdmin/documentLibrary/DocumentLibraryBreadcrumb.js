import React from 'react';

const DocumentLibraryBreadcrumb = ({ s3Key }) => {
    if (!s3Key) return <></>;
    const s3Arr = s3Key.split('/');
    return (
        <div className="dl-breadcrumb">
            {s3Arr.map((item, i) => (
                <>
                    <a
                        href={`/company/document-library/${s3Arr.slice(
                            0,
                            s3Arr.indexOf(item) + 1,
                        )}`}
                        title={item}
                    >{`${item}${i === s3Arr.length - 1 ? ' / ' : ''}`}</a>
                </>
            ))}
        </div>
    );
};

export default DocumentLibraryBreadcrumb;
