import React from 'react';

import Error from 'components/shared/generic/form/presentational/Error';
import Loading from 'components/shared/generic/misc/containers/Loading';

const TableBody = ({
    colCount,
    error,
    isFetching,
    noData,
    noDataMessage,
    children
}) => {
    if (error && error.length)
        return (
            <tr>
                <td colSpan={colCount}>
                    <Error>{error}</Error>
                </td>
            </tr>
        );

    if (isFetching && noData)
        return (
            <tr>
                <td colSpan={colCount}>
                    <Loading />
                </td>
            </tr>
        );

    if (noData)
        return (
            <tr>
                <td colSpan={colCount}>
                    <p>{noDataMessage}</p>
                </td>
            </tr>
        );

    return children;
};

export default TableBody;
