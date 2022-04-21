import { formatDropdownOptions } from '../../../../../helpers/general';
import { useMemo } from 'react';
import { DROPDOWN_OPTION_MANUFACTURER_ENABLED } from '../../../../../constants/companyAdmin/enums';

export const useDropdownOpts = (options, optionConfigurations) => {
    const opts = useMemo(() => {
        if (!optionConfigurations) return formatDropdownOptions(options);

        const enabledOpts = optionConfigurations
            .filter(opt => !opt.isDisabled)
            .map(opt => opt.name);
        const optsFiltered = options.filter(opt => enabledOpts.includes(opt.id));
        return formatDropdownOptions(optsFiltered);
    }, [options, optionConfigurations]);

    return opts;
};

export const useFilterPinOptions = (questionValue, options, companyID, pinOptionTypeID) => {
    return useMemo(
        () =>
            options.filter(option => {
                // remove deleted option if not already selected
                if (questionValue?.pinOptionVersionID !== option.value && option.isDeleted)
                    return false;
                if (option.companyID !== companyID && option.companyID !== null) {
                    return false;
                }
                return option.pinOptionTypeID === pinOptionTypeID;
            }),
        [questionValue, options, companyID, pinOptionTypeID],
    );
};

export const emptyAnswer = {
    textValue: null,
    numericValue: null,
    s3KeyValue: null,
    base64Value: null,
    booleanValue: null,
    pinOptionVersionID: null,
};
