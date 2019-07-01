import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';
import Field from 'components/shared/generic/form/presentational/Field';
import SiteManagementMoveFromOptionsRoute from '../containers/SiteManagementMoveFromOptionsRoute';

const SiteManagementMoveFrom = ({
    handleChange,
    companies,
    selectedCompany,
    hierarchies,
    selectedHierarchy
}) => (
    <Block>
        <BlockHeading title="Company to move from" />

        <Field name="Select a company" classes="full-length">
            <Select
                name="moveFromCompany"
                options={companies}
                value={selectedCompany}
                onChange={handleChange}
                placeholder="-- select company --"
                search
            />
        </Field>

        {!!selectedCompany && (
            <Field name="Select a hierarchy level" classes="full-length">
                <Select
                    name="moveFromHierarchy"
                    options={hierarchies}
                    value={selectedHierarchy}
                    onChange={handleChange}
                    placeholder="-- select hierarchy --"
                />
            </Field>
        )}

        <SiteManagementMoveFromOptionsRoute
            hierarchyID={selectedHierarchy}
            companyID={selectedCompany}
        />
    </Block>
);

export default SiteManagementMoveFrom;
