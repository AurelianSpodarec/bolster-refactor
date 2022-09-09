import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import TemplatesList from './TemplatesList';

const TemplatesTable = ({ headers, templates, isFetching, error }) => (
    <Table
        headers={headers}
        noData={!templates.length}
        noDataMessage="No templates to display."
        isFetching={isFetching}
        error={error}
    >
        <TemplatesList templates={templates} />
    </Table>
);

export default TemplatesTable;
