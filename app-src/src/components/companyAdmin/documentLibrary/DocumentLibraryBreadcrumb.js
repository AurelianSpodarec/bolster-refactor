import { stripS3Key } from 'helpers/general';
import React from 'react';
import { Link } from 'react-router-dom';

const DocumentLibraryBreadcrumb = ({ prefix }) => {
    if (!prefix) return <></>;
    const prefixArr = stripS3Key(prefix).split('/');
    
    return (
        <div className="dl-breadcrumb">
             <Link to={'/company/document-library'} >
                Company files
            </Link>
            {prefixArr.map((item, i) => (
                <React.Fragment key={i}>
                    {' / '}
                    <Link to={`/company/document-library?prefix=${item}`} >
                        {item}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
};

export default DocumentLibraryBreadcrumb;
