import React from 'react';

import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const PrivacyPolicy = ({ privacy, error, isFetching }) => {
    let pageTitle = 'Privacy Policy';
    const meta = {
        description: '',
        canonical: '/auth/privacy-policy',
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

    pageTitle = privacy.title;

    return (
        <>
            <PageMeta meta={{ title: pageTitle, ...meta }} />
            <div className="content-page wysiwyg">
                <h1>{privacy.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: privacy.copy }}></div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
