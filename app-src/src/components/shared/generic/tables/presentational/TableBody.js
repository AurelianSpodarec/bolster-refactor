import React from 'react';

import Error from 'components/shared/generic/form/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';

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
                <td colSpan={colCount} style={{ textAlign: 'center' }}>
                    <Error>{error}</Error>
                </td>
            </tr>
        );

    if (isFetching && noData)
        return (
            <tr>
                <td colSpan={colCount} style={{ textAlign: 'center' }}>
                    <Loading />
                </td>
            </tr>
        );

    if (noData)
        return (
            <tr>
                <td
                    className="no-data"
                    colSpan={colCount}
                    style={{ textAlign: 'center' }}
                >
                    <p>{noDataMessage}</p>
                </td>
            </tr>
        );

    return children;
};

export default TableBody;
