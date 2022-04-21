import { formatDropdownOptions } from '../../../../../helpers/general';
import { useMemo } from 'react';

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

export const emptyAnswer = {
    textValue: null,
    numericValue: null,
    s3KeyValue: null,
    base64Value: null,
    booleanValue: null,
    pinOptionVersionID: null,
};
