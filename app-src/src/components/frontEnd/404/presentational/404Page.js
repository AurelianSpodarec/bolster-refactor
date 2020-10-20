import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const PageNotFound = () => {
    return (
        <>
            <PageMeta meta={pageMeta.pageNotFound} />
            <div className="content-page wysiwyg">
                <h2>404: Page Not Found</h2>
                <div className="divider"></div>
                <h3>Sorry, the page you were looking for doesn't exist.</h3>
            </div>
        </>
    );
};

export default PageNotFound;
