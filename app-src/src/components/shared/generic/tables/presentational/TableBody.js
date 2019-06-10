import React from 'react';

import Error from 'components/shared/generic/form/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const TableBody = ({
    colCount,
    error,
    isFetching,
    noData,
    noDataMessage,
    children,
    withoutTBody = false
}) => {
    if (error && error.length)
        return (
            <tbody>
                <tr>
                    <td colSpan={colCount} className="no-data-td">
                        <Error>{error}</Error>
                    </td>
                </tr>
            </tbody>
        );

    if (isFetching && noData)
        return (
            <tbody>
                <tr>
                    <td colSpan={colCount} className="no-data-td">
                        <Loading />
                    </td>
                </tr>
            </tbody>
        );

    if (noData)
        return (
            <tbody>
                <tr>
                    <td
                        className="no-data-td"
                        colSpan={colCount}
                        style={{ textAlign: 'center' }}
                    >
                        <p>{noDataMessage}</p>
                    </td>
                </tr>
            </tbody>
        );

    if (withoutTBody) return children;

    return <tbody>{children}</tbody>;
};

export default TableBody;
