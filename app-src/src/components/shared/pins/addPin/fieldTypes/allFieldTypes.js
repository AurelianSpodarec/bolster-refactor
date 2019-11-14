import SingleLine from '../fieldTypes/SingleLine';
import MultiLine from '../fieldTypes/MultiLine';
import NumberInput from '../fieldTypes/NumberInput';
import SingleDropdown from '../fieldTypes/SingleDropdown';
import MultiDropdown from '../fieldTypes/MultiDropdown';
import MultiMulti from '../fieldTypes/MultiMulti';
import CheckBox from '../fieldTypes/CheckBox';
import Radio from '../fieldTypes/Radio';
import SinglePhoto from '../fieldTypes/SinglePhoto';
import MultiPhoto from '../fieldTypes/MultiPhoto';
import Signature from '../fieldTypes/Signature';
import Status from '../fieldTypes/Status';
import DropdownOptions from '../fieldTypes/DropdownOptions';
import MultiDropdownOptions from '../fieldTypes/MultiDropdownOptions';
import MultiMultiDropdownOptions from '../fieldTypes/MultiMultiDropdownOptions';
import StaticImage from '../fieldTypes/StaticImage';


import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
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
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN,
    MULTI_MULTI_DROPDOWN_OPTIONS,
    STATIC_IMAGE
} = QUESTION_TYPE_VALUES;

export const fieldTypes = {
    [SINGLE_LINE]: SingleLine,
    [MULTI_LINE]: MultiLine,
    [NUMBER]: NumberInput,
    [DROPDOWN]: SingleDropdown,
    [MULTI_DROPDOWN]: MultiDropdown,
    [CHECKBOX]: CheckBox,
    [RADIO]: Radio,
    [SINGLE_PHOTO]: SinglePhoto,
    [MULTI_PHOTO]: MultiPhoto,
    [SIGNATURE]: Signature,
    [STATUS]: Status,
    [DROPDOWN_OPTIONS]: DropdownOptions,
    [MULTI_DROPDOWN_OPTIONS]: MultiDropdownOptions,
    [MULTI_MULTI_DROPDOWN]: MultiMulti,
    [MULTI_MULTI_DROPDOWN_OPTIONS]: MultiMultiDropdownOptions,
    [STATIC_IMAGE]: StaticImage,
};

export const getDefaultValue = question => {
    switch (question.type) {
        case SINGLE_LINE:
        case MULTI_LINE:
        case NUMBER:
        case DROPDOWN:
        case SINGLE_PHOTO:
        case DROPDOWN_OPTIONS:
            return '';
        case RADIO:
            return question.configurationJSON.defaultValue || '';
        case MULTI_PHOTO:
        case MULTI_DROPDOWN:
        case MULTI_MULTI_DROPDOWN:
        case MULTI_MULTI_DROPDOWN_OPTIONS:
        case MULTI_DROPDOWN_OPTIONS:
            return [];
        case CHECKBOX:
            return false;
        default:
            return '';
    }
};
