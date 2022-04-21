import React, { useEffect } from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from 'constants/companyAdmin/enums';
import { getSortedDropdownOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';

const DropdownOptions = ({
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
    // ! If a user is editing a pin that has a dropdown option that's no longer available,
    // ! this needs to be kept as an option.
    let formattedOpts = [];
    const questionValue = answers[id] ?? [];

    // todo default value
    useEffect(() => {
        if (!questionValue && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    }, []);

    // for edit only
    const filteredOptions = useFilterPinOptions(
        questionValue,
        pinOptions,
        companyID,
        pinOptionTypeID,
    );

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
        originalPinOptionAns?.forEach(ans => {
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
    // todo figure out value / handlechange
    const [firstValue] = questionValue;
    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={getSortedDropdownOptions(formattedOpts, defaultDropdownSorting)}
            value={firstValue?.pinOptionVersionID}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

export default DropdownOptions;
