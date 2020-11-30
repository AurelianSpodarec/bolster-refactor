import React from 'react';

import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const Terms = ({ terms, error, isFetching }) => {
    let pageTitle = 'Terms & Conditions';
    const meta = {
        description: '',
        canonical: '/auth/terms',
        excludeFromSearchEngines: true,
    };

    if (error) {
        return (
            <>  
                <PageMeta meta={{ title: pageTitle, ...meta }} />
                <div className="content-page wysiwyg">
                    <p>There was an error fetching the data.</p>
                </div>
            </>
        );
    }

    if (isFetching) {
        return (
            <>
                <PageMeta meta={{ title: pageTitle, ...meta }} />
                <div className="content-page wysiwyg">
                    <Loading />
                </div>
            </>
        );
    }

    pageTitle = terms.title;

    return (
        <>
            <PageMeta meta={{ title: pageTitle, ...meta }} />
            <div className="content-page wysiwyg">
                <h1>{terms.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: terms.copy }}></div>
            </div>
        </>
    );
};

export default Terms;
