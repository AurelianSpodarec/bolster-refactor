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
    children,
    onClick = () => {},
}) => {
    if (error && error.length)
        return (
            <Block containerClass={containerClass} contentClass={contentClass} onClick={onClick}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <Error extraClasses="switched">{error}</Error>
            </Block>
        );
    if (isFetching && isEmpty)
        return (
            <Block containerClass={containerClass} contentClass={contentClass} onClick={onClick}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <Loading extraTextClasses="switched" />
            </Block>
        );

    if (isEmpty)
        return (
            <Block containerClass={containerClass} contentClass={contentClass} onClick={onClick}>
                {!!heading && <h3 className="heading heading-3">{heading}</h3>}
                <p className="no-data switched">{noDataMessage}</p>
            </Block>
        );

    if (noWhiteBackground) return children;

    return (
        <Block containerClass={containerClass} contentClass={contentClass} onClick={onClick}>
            {!!heading && <h3 className="heading heading-3">{heading}</h3>}
            {children}
        </Block>
    );
};

export default BlockContainer;
