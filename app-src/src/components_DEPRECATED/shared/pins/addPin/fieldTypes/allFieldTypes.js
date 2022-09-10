import SingleLine from './SingleLine';
import MultiLine from './MultiLine';
import NumberInput from './NumberInput';
import SingleDropdown from './SingleDropdown';
import MultiDropdown from './MultiDropdown';
import MultiMulti from './MultiMulti';
import CheckBox from './CheckBox';
import Radio from './Radio';
import SinglePhoto from './SinglePhoto';
import DocumentUpload from './DocumentUpload';

import MultiPhoto from './MultiPhoto';
import Signature from './Signature';
import Status from './Status';
import DropdownOptions from './DropdownOptions';
import MultiDropdownOptions from './MultiDropdownOptions';
import MultiMultiDropdownOptions from './MultiMultiDropdownOptions';
import StaticImage from './StaticImage';

import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
import { emptyAnswer } from './helpers';
const {
    SINGLE_LINE,
    MULTI_LINE,
    NUMBER,
    DROPDOWN,
    MULTI_DROPDOWN,
    RADIO,
    CHECKBOX,
    SIGNATURE,
    SINGLE_PHOTO,
    MULTI_PHOTO,
    STATUS,
    PIN_OPTION_TYPES,
    MULTI_PIN_OPTION_TYPES,
    MULTI_MULTI_DROPDOWN,
    MULTI_MULTI_PIN_OPTION_TYPES,
    STATIC_IMAGE,
    DOCUMENT_UPLOAD,
} = QUESTION_TYPE_NUMBERS;

export const fieldTypes = {
    [SINGLE_LINE]: SingleLine,
    [MULTI_LINE]: MultiLine,
    [NUMBER]: NumberInput,
    [DROPDOWN]: SingleDropdown,
    [MULTI_DROPDOWN]: MultiDropdown,
    [CHECKBOX]: CheckBox,
    [RADIO]: Radio,
    [SINGLE_PHOTO]: SinglePhoto,
    [DOCUMENT_UPLOAD]: DocumentUpload,
    [MULTI_PHOTO]: MultiPhoto,
    [SIGNATURE]: Signature,
    [STATUS]: Status,
    [PIN_OPTION_TYPES]: DropdownOptions,
    [MULTI_PIN_OPTION_TYPES]: MultiDropdownOptions,
    [MULTI_MULTI_DROPDOWN]: MultiMulti,
    [MULTI_MULTI_PIN_OPTION_TYPES]: MultiMultiDropdownOptions,
    [STATIC_IMAGE]: StaticImage,
};

export const getDefaultValue = question => {
    switch (+question.type) {
        case SINGLE_LINE:
        case MULTI_LINE:
        case NUMBER:
        case SINGLE_PHOTO:
        case MULTI_PHOTO:
            return [];
        case PIN_OPTION_TYPES: {
            if (!question.defaultValue) return [];
            return [{ ...emptyAnswer, pinOptionVersionID: question.defaultValue }];
        }
        case RADIO:
        case DROPDOWN:
        case MULTI_DROPDOWN:
            if (!question.defaultValue) return [];
            return [{ ...emptyAnswer, textValue: question.defaultValue }];
        case MULTI_MULTI_DROPDOWN:
            if (!question.defaultValue) return [];
            return question.defaultValue
                .split(',')
                .map(ans => ({ ...emptyAnswer, textValue: ans }));
        case MULTI_MULTI_PIN_OPTION_TYPES:
        case MULTI_PIN_OPTION_TYPES:
            if (!question.defaultValue) return [];
            if (Array.isArray(question.defaultValue)) {
                return question.defaultValue.map(ans => ({
                    ...emptyAnswer,
                    pinOptionVersionID: ans,
                }));
            }
            return [{ ...emptyAnswer, pinOptionVersionID: question.defaultValue }];
        case CHECKBOX:
            return [{ ...emptyAnswer, booleanValue: false }];
        default:
            return [];
    }
};
