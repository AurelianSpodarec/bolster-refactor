import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplatesList from './TemplatesList';

const TemplatesTable = ({ headers, isFetching, error, templates }) => {
    return (
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!templates.length}
            noDataMessage={'There are no templates to display.'}
        >
            <TemplatesList templates={templates} />
        </Table>
    );
};

export default TemplatesTable;
