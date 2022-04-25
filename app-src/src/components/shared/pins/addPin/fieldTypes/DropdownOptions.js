import React, { useEffect } from 'react';
import Select from 'components/shared/generic/form/presentational/Select';
import { getSortedDropdownOptions } from 'helpers/addPin';
import { useFilterPinOptions } from './helpers';
import CostingMeasurement from './CostingMeasurement';
import { selectPinOptionType } from '../../../../../selectors/superAdmin/pinOptionTypes';
import { useSelector } from 'react-redux';

const DropdownOptions = ({
    isRequired,
    question: { id, defaultValue, optionType },
    answers,
    handleChange,
    edit,
    originalPinOptionAns,
    defaultDropdownSorting,
    companyID,
    pinOptions,
    // todo
    isCostingEnabled = true,
    handleMeasurementChange,
    measurements,
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

    const type = useSelector(state => selectPinOptionType(state, optionType));
    // for edit only
    const filteredOptions = useFilterPinOptions(questionValue, pinOptions, companyID, optionType);

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
    const [firstValue] = questionValue;
    const selected = !firstValue
        ? null
        : pinOptions.find(opt => opt.latestVersion.id === firstValue.pinOptionVersionID);

    const shouldShowCosting = isCostingEnabled && type.hasCosting && !!firstValue;
    return (
        <>
            <Select
                placeholder="-- select --"
                name={`answer-${id}`}
                options={getSortedDropdownOptions(formattedOpts, defaultDropdownSorting)}
                value={firstValue?.pinOptionVersionID}
                onChange={handleChange}
                required={isRequired}
            />
            {shouldShowCosting && (
                <CostingMeasurement
                    measurement={measurements[firstValue.uid]}
                    option={selected}
                    uid={firstValue.uid}
                    handleChange={handleMeasurementChange}
                />
            )}
        </>
    );
};

export default DropdownOptions;
