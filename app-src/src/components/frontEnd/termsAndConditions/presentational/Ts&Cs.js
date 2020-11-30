import React from 'react';

import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const Terms = ({ terms, privacy, eula, error, isFetching }) => {
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

    return (
        <>
            <PageMeta meta={{ title: pageTitle, ...meta }} />
            <div className="content-page wysiwyg">
                <h2>Terms & Conditions</h2>
                <div dangerouslySetInnerHTML={{ __html: terms.copy }}></div>
                <hr />
                <h2>Privacy Policy</h2>
                <div dangerouslySetInnerHTML={{ __html: privacy.copy }}></div>
                <div className="paragraph-divider" />
                <hr />
                <h2>EULA</h2>
                <div dangerouslySetInnerHTML={{ __html: eula.copy }}></div>
            </div>
        </>
    );
};

export default Terms;
