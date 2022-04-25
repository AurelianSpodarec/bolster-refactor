import { formatDropdownOptions } from '../../../../../helpers/general';
import { useMemo } from 'react';
import { QUESTION_TYPE_NUMBERS as TYPES } from '../../../../../constants/shared/templateBuilder';
import { selectPinOptions } from '../../../../../selectors/companyAdmin/pinOptions';
import { useSelector } from 'react-redux';
import { selectPinOptionVersions } from '../../../../../selectors/companyAdmin/pinOptionVersions';
import uuid from 'uuid/v4';

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
    // todo filter with site sets too
    const pinOptions = useSelector(selectPinOptions);
    const pinOptionVersions = useSelector(selectPinOptionVersions);
    return useMemo(() => {
        const pinOptionsForService = Object.values(pinOptions).filter(
            ({ serviceIDs }) => !serviceIDs || serviceIDs.includes(serviceID),
        );
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
                if (oldAnswers[count]) {
                    counts[ans] = count + 1;
                }
                const oldAnswer = oldAnswers[count];
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
            if (!value) return emptyAnswer;
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
