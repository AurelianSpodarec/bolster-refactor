import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const TemplatesListItem = ({
    location: { pathname },
    template: { name, uuid }
}) => (
    <>
        <tr>
            <td>{name}</td>
            <td>
                <Link
                    className="button"
                    to={`${pathname}/template/${uuid}`}
                    onClick={e => e.stopPropagation()}
                >
                    View
                </Link>
            </td>
        </tr>
    </>
);

export default withRouter(TemplatesListItem);
