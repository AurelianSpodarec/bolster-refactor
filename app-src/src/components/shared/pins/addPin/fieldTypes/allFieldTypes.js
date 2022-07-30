import SingleLine from '../fieldTypes/SingleLine';
import MultiLine from '../fieldTypes/MultiLine';
import NumberInput from '../fieldTypes/NumberInput';
import SingleDropdown from '../fieldTypes/SingleDropdown';
import MultiDropdown from '../fieldTypes/MultiDropdown';
import MultiMulti from '../fieldTypes/MultiMulti';
import CheckBox from '../fieldTypes/CheckBox';
import Radio from '../fieldTypes/Radio';
import SinglePhoto from '../fieldTypes/SinglePhoto';
import DocumentUpload from '../fieldTypes/DocumentUpload';

import MultiPhoto from '../fieldTypes/MultiPhoto';
import Signature from '../fieldTypes/Signature';
import Status from '../fieldTypes/Status';
import DropdownOptions from '../fieldTypes/DropdownOptions';
import MultiDropdownOptions from '../fieldTypes/MultiDropdownOptions';
import MultiMultiDropdownOptions from '../fieldTypes/MultiMultiDropdownOptions';
import StaticImage from '../fieldTypes/StaticImage';

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
