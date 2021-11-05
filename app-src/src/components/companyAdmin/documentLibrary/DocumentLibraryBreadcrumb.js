import { stripS3Key } from 'helpers/general';
import React from 'react';
import { Link } from 'react-router-dom';

const DocumentLibraryBreadcrumb = ({ prefix }) => {
    let prefixArr = [];
    try {
        prefixArr = stripS3Key(prefix).split('/');
    } catch {
        prefixArr = [];
    }

    return (
        <span className="dl-breadcrumb">
            {prefixArr.length > 0 ? (
                <Link to={'/company/document-library'}>Company files</Link>
            ) : (
                <span>Company files</span>
            )}
            {prefixArr.map((item, i) => (
                <React.Fragment key={i}>
                    {' / '}
                    {i < prefixArr.length - 1 ? (
                        <Link to={`/company/document-library?prefix=${item}`}>{item}</Link>
                    ) : (
                        <span>{item}</span>
                    )}
                </React.Fragment>
            ))}
        </span>
    );
};

export default DocumentLibraryBreadcrumb;
