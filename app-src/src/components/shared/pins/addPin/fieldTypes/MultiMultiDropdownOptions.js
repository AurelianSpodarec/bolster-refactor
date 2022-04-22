import React, { useEffect } from 'react';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';
import { formatAnswers, getSortedDropdownOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';

const MultiMultiDropdownOptions = ({
    isRequired,
    question: { id, defaultValue, pinOptionTypeID },
    answers,
    handleChange,
    edit,
    originalPinOptionAns,
    defaultDropdownSorting,
    companyID,
    pinOptions,
}) => {
    // todo share component with MultiDropdownOptions
    let formattedOpts = [];
    const questionValue = answers[id];

    useEffect(() => {
        if (!questionValue || (!questionValue.length && !edit && defaultValue)) {
            handleChange(null, [defaultValue]);
        }
    }, []);

    const filteredOptions = useFilterPinOptions(
        questionValue,
        pinOptions,
        companyID,
        pinOptionTypeID,
    );
    // ! If a user is editing a pin that has a dropdown option that's no longer available
    // , this needs to be kept as an option.
    if (edit) {
        const curOptions = filteredOptions.map(opt => opt.id);

        formattedOpts = filteredOptions.map(option => ({
            value: option.id,
            label: option.name,
            id: option.id,
            sort: option.sort,
            createdOn: option.createdOn,
        }));
        // todo tidy
        console.log({ originalPinOptionAns });
        Object.values(originalPinOptionAns ?? {}).forEach(ans => {
            if (!curOptions.includes(ans.pinOptionVersionID)) {
                let version;
                const optionWithVersion = pinOptions.find(opt => {
                    version = opt.versions.find(vers => vers.id === ans.pinOptionVersionID);
                    return !!version;
                });
                if (optionWithVersion) {
                    const isOtherVersionPresent = optionWithVersion.versions.some(vers =>
                        curOptions.includes(vers.id),
                    );
                    if (!isOtherVersionPresent) {
                        formattedOpts.push({
                            value: version.id,
                            label: version.name,
                            id: version.id,
                            sort: version.sort,
                            createdOn: version.createdOn,
                        });
                    }
                }
            }
        });
    } else {
        formattedOpts = pinOptions
            // todo uncomment when question has type
            // .filter(option => option.pinOptionTypeID === pinOptionTypeID)
            .map(option => ({
                value: option.latestVersion.id,
                label: option.latestVersion.name,
                id: option.latestVersion.id,
                sort: option.sort,
                createdOn: option.createdOn,
            }));
    }
    const options = getSortedDropdownOptions(formattedOpts, defaultDropdownSorting);

    return (
        <BoundlessSelect
            required={isRequired}
            options={options}
            value={formatAnswers(questionValue, options)}
            name={`answer-${id}`}
            onChange={handleChange}
            search
        />
    );
};

export default MultiMultiDropdownOptions;
