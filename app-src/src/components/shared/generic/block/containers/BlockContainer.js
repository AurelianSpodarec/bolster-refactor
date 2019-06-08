import React from 'react';

import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import Block from '../presentational/Block';

const BlockContainer = ({
    containerClass,
    contentClass,
    error,
    isFetching,
    isEmpty,
    noDataMessage = 'There is no data to display',
    heading,
    noWhiteBackground = false,
    children
}) => {
    if (error && error.length)
        return (
            <Block containerClass={containerClass} contentClass={contentClass}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <Error>{error}</Error>
            </Block>
        );
    if (isFetching && isEmpty)
        return (
            <Block containerClass={containerClass} contentClass={contentClass}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <Loading />
            </Block>
        );

    if (isEmpty)
        return (
            <Block containerClass={containerClass} contentClass={contentClass}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <p className="no-data">{noDataMessage}</p>
            </Block>
        );

    if (noWhiteBackground) return children;

    return (
        <Block containerClass={containerClass} contentClass={contentClass}>
            {!!heading && <h3 className="heading heading-3">{heading}</h3>}
            {children}
        </Block>
    );
};

export default BlockContainer;
