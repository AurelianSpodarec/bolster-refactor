import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';
import Field from 'components/shared/generic/form/presentational/Field';
import SiteManagementMoveToOptionsRoute from '../containers/SiteManagementMoveToOptionsRoute';

const SiteManagementMoveTo = ({
    handleChange,
    companies,
    selectedCompany,
    selectedHierarchy
}) => (
    <Block>
        <BlockHeading title="Company to move to" />

        <Field name="Select a company" classes="full-length">
            <Select
                name="moveToCompany"
                options={companies}
                value={selectedCompany}
                onChange={handleChange}
                placeholder="-- select company --"
                search
            />
        </Field>

        {!!selectedCompany && (
            <SiteManagementMoveToOptionsRoute
                hierarchyID={selectedHierarchy}
                companyID={selectedCompany}
            />
        )}
    </Block>
);

export default SiteManagementMoveTo;
