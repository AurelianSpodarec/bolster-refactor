import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';
import Field from 'components/shared/generic/form/presentational/Field';
import MoveToolMoveFromOptionsRoute from '../containers/MoveToolMoveFromOptionsRoute';

const MoveToolMoveFrom = ({
    handleChange,
    handleHierarchyChange,
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
                    onChange={handleHierarchyChange}
                    placeholder="-- select hierarchy --"
                />
            </Field>
        )}

        <MoveToolMoveFromOptionsRoute
            hierarchyID={selectedHierarchy}
            companyID={selectedCompany}
        />
    </Block>
);

export default MoveToolMoveFrom;
