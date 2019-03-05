import React from 'react';

import Error from 'components/generic/form/presentational/Error';
import Loading from 'components/generic/presentational/Loading';

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

    if (isFetching)
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
