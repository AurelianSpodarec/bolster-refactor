import React from 'react';
import { Helmet } from 'react-helmet';

const PageMeta = ({ meta: { title, description, canonical, excludeFromSearchEngines } }) => (
    <Helmet>
        <title>{title ? `${title} | Bolster Systems` : 'Bolster Systems'}</title>
        <meta name="description" content={description} />
        {canonical && (
            <link rel="canonical" href={`https://www.bolstersystems.com${canonical}`}></link>
        )}
        {excludeFromSearchEngines && <meta name="robots" content="noindex" />}
    </Helmet>
);

export default PageMeta;
