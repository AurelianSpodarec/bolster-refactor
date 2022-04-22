import React, { useEffect } from 'react';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { formatAnswers, getSortedDropdownOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';

const MultiDropdownOptions = ({
    isRequired,
    question: { id, defaultValue, pinOptionTypeID },
    answers,
    edit,
    handleChange,
    originalPinOptionAns,
    defaultDropdownSorting,
    companyID,
    pinOptions,
}) => {
    // todo share component with MultiMultiDropdownOptions
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
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    //    this needs to be kept as an option.
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
        Object.values(originalPinOptionAns ?? {})?.forEach(ans => {
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
        <MultiSelect
            required={isRequired}
            options={options}
            value={formatAnswers(questionValue, options)}
            name={`answer-${id}`}
            onChange={handleChange}
        />
    );
};

export default MultiDropdownOptions;
