import { stripS3Key } from 'helpers/general';
import React from 'react';
import { Link } from 'react-router-dom';

const DocumentLibraryBreadcrumb = ({ prefix }) => {
    if (!prefix) return <></>;
    const prefixArr = stripS3Key(prefix).split('/');
    return (
        <div className="dl-breadcrumb">
            {prefixArr.map((item, i) => (
                <>
                    <Link
                        href={`/company/document-library/${prefixArr.slice(
                            0,
                            prefixArr.indexOf(item) + 1,
                        )}`}
                        title={item}
                    >{`${item}${i === prefixArr.length - 1 ? ' / ' : ''}`}</Link>
                </>
            ))}
        </div>
    );
};

export default DocumentLibraryBreadcrumb;
