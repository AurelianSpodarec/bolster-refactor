import React from 'react';
import { Link } from 'react-router-dom';

const DocumentLibraryBreadcrumb = ({ prefix }) => {
    let prefixArr = (prefix ? prefix : '').split('/');

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
                        <Link to={`/company/document-library?prefix=${prefixArr.slice(0, i + 1).join('/')}/`}>{item}</Link>
                    ) : (
                        <span>{item}</span>
                    )}
                </React.Fragment>
            ))}
        </span>
    );
};

export default DocumentLibraryBreadcrumb;
