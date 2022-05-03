import { formatDropdownOptions } from '../../../../../helpers/general';
import { useMemo } from 'react';
import { QUESTION_TYPE_NUMBERS as TYPES } from '../../../../../constants/shared/templateBuilder';
import { selectPinOptions } from '../../../../../selectors/companyAdmin/pinOptions';
import { useSelector } from 'react-redux';
import { selectPinOptionVersions } from '../../../../../selectors/companyAdmin/pinOptionVersions';
import uuid from 'uuid/v4';
import { selectPinOptionSets } from '../../../../../selectors/companyAdmin/pinOptionSets';

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

export const useAddPinOptions = serviceID => {
    const pinOptionSets = useSelector(selectPinOptionSets);
    const pinOptions = useSelector(selectPinOptions);
    const pinOptionVersions = useSelector(selectPinOptionVersions);
    return useMemo(() => {
        const pinOptionsForService = Object.values(pinOptions).filter(option => {
            const set = pinOptionSets[option.pinOptionSetID];
            const serviceIDs = option.serviceIDs || set?.serviceIDs;
            return !serviceIDs || serviceIDs.includes(+serviceID);
        });
        const pinOptionVersionsGroupedByOptionID = Object.values(pinOptionVersions).reduce(
            (acc, version) => ({
                ...acc,
                [version.pinOptionID]: [...(acc[version.pinOptionID] || []), version],
            }),
            {},
        );
        return pinOptionsForService.map(pinOption => {
            const versions = pinOptionVersionsGroupedByOptionID[pinOption.id] ?? [];
            const latestVersion = versions.reduce((acc, version) =>
                version.revisionNumber > acc.revisionNumber ? version : acc,
            );
            return {
                ...pinOption,
                latestVersion,
                versions,
            };
        });
    }, [pinOptions, pinOptionVersions, serviceID]);
};

export const useFilterPinOptions = (
    questionValue,
    options,
    companyID,
    type,
    drawing,
    originalPinOptionAns,
    edit,
) => {
    let formattedOpts;
    const filteredOptions = useMemo(
        () =>
            options.filter(option => {
                if (type?.hasSiteLinks) {
                    const setsForType = drawing?.pinOptionSetIDsByType?.[type?.id];
                    if (!setsForType?.length) {
                        if (!option.isDefault) return false;
                    } else if (!setsForType.includes(option.pinOptionSetID)) {
                        return false;
                    }
                }
                // remove deleted option if not already selected
                if (
                    questionValue?.pinOptionVersionID !== option.id &&
                    (option.isDeleted || option.isDisabled)
                ) {
                    return false;
                }
                if (option.companyID !== companyID && option.companyID !== null) {
                    return false;
                }
                return option.pinOptionTypeID === type?.id;
            }),
        [questionValue, options, companyID, type, drawing],
    );
    if (edit) {
        const curOptionVersionIDs = filteredOptions.map(opt => opt.latestVersion.id);

        formattedOpts = filteredOptions.map(option => ({
            value: option.latestVersion.id,
            label: option.latestVersion.name,
            id: option.latestVersion.id,
            sort: option.sort,
            createdOn: option.createdOn,
        }));
        // todo tidy
        Object.values(originalPinOptionAns ?? {}).forEach(ans => {
            if (!curOptionVersionIDs.includes(ans.pinOptionVersionID)) {
                let version;
                const optionWithVersion = options.find(opt => {
                    version = opt.versions.find(vers => vers.id === ans.pinOptionVersionID);
                    return !!version;
                });
                if (optionWithVersion) {
                    const isOtherVersionPresent = optionWithVersion.versions.some(vers =>
                        curOptionVersionIDs.includes(vers.id),
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
        formattedOpts = filteredOptions.map(option => ({
            value: option.latestVersion.id,
            label: option.latestVersion.name,
            id: option.latestVersion.id,
            sort: option.sort,
            createdOn: option.createdOn,
        }));
    }

    return formattedOpts;
    // return useMemo(
    //     () =>
    //         options.filter(option => {
    //             if (type?.hasSiteLinks) {
    //                 const setsForType = drawing?.pinOptionSetIDsByType?.[type?.id];
    //                 if (!setsForType || !setsForType.length) {
    //                     if (!option.isDefault) return false;
    //                 } else if (!setsForType.includes(option.pinOptionSetID)) {
    //                     return false;
    //                 }
    //             }
    //             // remove deleted option if not already selected
    //             if (questionValue?.pinOptionVersionID !== option.value && option.isDeleted) {
    //                 return false;
    //             }
    //             // todo usage rules - currently user company & global
    //             if (option.companyID !== companyID && option.companyID !== null) {
    //                 return false;
    //             }
    //             return option.pinOptionTypeID === type?.id;
    //         }),
    //     [questionValue, options, companyID, type, drawing],
    // );
};

export const formatMeasurementsForPostBody = (measurements, questionID) => {
    const questionMeasurements = measurements[questionID];
    if (!questionMeasurements) return null;
    return Object.entries(questionMeasurements).map(([key, value]) => ({
        uid: key,
        ...value,
    }));
};

export const emptyAnswer = {
    textValue: null,
    numericValue: null,
    s3KeyValue: null,
    base64Value: null,
    booleanValue: null,
    pinOptionVersionID: null,
};

export const isAnswerValueEmpty = answerValue => {
    return (
        !answerValue.textValue &&
        !answerValue.numericValue &&
        !answerValue.s3KeyValue &&
        !answerValue.base64Value &&
        !answerValue.booleanValue &&
        !answerValue.pinOptionVersionID
    );
};

export const getValueForQuestionAnswer = (question, value, answerValues) => {
    switch (question.type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.DROPDOWN:
        case TYPES.RADIO: {
            const answer = {
                ...emptyAnswer,
                textValue: value,
            };
            return [answer];
        }
        case TYPES.MULTI_DROPDOWN:
        case TYPES.MULTI_MULTI_DROPDOWN: {
            return value.map(ans => ({
                ...emptyAnswer,
                textValue: ans,
            }));
        }
        case TYPES.PIN_OPTION_TYPES: {
            const answer = {
                ...emptyAnswer,
                pinOptionVersionID: value,
                uid: uuid(),
            };
            return [answer];
        }
        case TYPES.MULTI_PIN_OPTION_TYPES:
        case TYPES.MULTI_MULTI_PIN_OPTION_TYPES: {
            const counts = {};
            return value.map(ans => {
                const count = counts[ans] ?? 0;
                const oldAnswers =
                    answerValues?.filter(answer => answer.pinOptionVersionID === ans) ?? [];
                const oldAnswer = oldAnswers[count];
                if (oldAnswer) {
                    counts[ans] = count + 1;
                }
                const uid = oldAnswer?.uid ?? uuid();
                return {
                    ...emptyAnswer,
                    pinOptionVersionID: ans,
                    uid,
                };
            });
        }
        case TYPES.NUMBER: {
            const answer = {
                ...emptyAnswer,
                numericValue: value,
            };
            return [answer];
        }
        case TYPES.CHECKBOX: {
            const answer = {
                ...emptyAnswer,
                booleanValue: value,
            };
            return [answer];
        }
        case TYPES.SIGNATURE: {
            if (!value) return [emptyAnswer];
            const isS3Key = value.includes('.');
            const keyName = isS3Key ? 's3KeyValue' : 'base64Value';
            const answer = {
                ...emptyAnswer,
                [keyName]: value,
            };
            return [answer];
        }
        case TYPES.SINGLE_PHOTO:
        case TYPES.DOCUMENT_UPLOAD: {
            const answer = {
                ...emptyAnswer,
                s3KeyValue: value,
            };
            return [answer];
        }
        case TYPES.MULTI_PHOTO: {
            return value.map(ans => ({
                ...emptyAnswer,
                s3KeyValue: ans,
            }));
        }
    }
};
