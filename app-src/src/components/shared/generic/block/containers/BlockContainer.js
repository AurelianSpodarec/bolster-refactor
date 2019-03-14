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
    noDataMessage = 'There is not data to display.',
    heading,
    children
}) => {
    console.log(isEmpty);
    if (error && error.length)
        return (
            <Block containerClass={containerClass} contentClass={contentClass}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <Error>
                    Oops! Something went wrong... Please try again later.
                </Error>
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

    return (
        <Block containerClass={containerClass} contentClass={contentClass}>
            {!!heading && <h3 className="heading heading-3">{heading}</h3>}
            {children}
        </Block>
    );
};

export default BlockContainer;
