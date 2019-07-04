import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import TemplatesList from './TemplatesList';

const TemplatesTable = ({
    headers,
    isFetching,
    error,
    templates,
    onMobile
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!templates.length}
        noDataMessage={
            'No templates to display. Please contact Bolster Systems to get a new template set up.'
        }
    >
        <TemplatesList
            templates={templates}
            headers={headers}
            onMobile={onMobile}
        />
    </Table>
);

export default TemplatesTable;
