export const QUESTION_TYPES = {
    '1': 'Single line',
    '2': 'Multi line',
    '3': 'Number',
    '4': 'Dropdown',
    '5': 'Multi dropdown',
    '6': 'Radio',
    '7': 'Checkbox',
    '8': 'Signature',
    '9': 'Single photo',
    '10': 'Multi photo',
    '11': 'Status'
};

export const QUESTION_TYPE_VALUES = {
    SINGLE_LINE: '1',
    MULTI_LINE: '2',
    NUMBER: '3',
    DROPDOWN: '4',
    MULTI_DROPDOWN: '5',
    RADIO: '6',
    CHECKBOX: '7',
    SIGNATURE: '8',
    SINGLE_PHOTO: '9',
    MULTI_PHOTO: '10',
    STATUS: '11'
};

export const QUESTION_TYPE_NUMBERS = {
    SINGLE_LINE: 1,
    MULTI_LINE: 2,
    NUMBER: 3,
    DROPDOWN: 4,
    MULTI_DROPDOWN: 5,
    RADIO: 6,
    CHECKBOX: 7,
    SIGNATURE: 8,
    SINGLE_PHOTO: 9,
    MULTI_PHOTO: 10,
    STATUS: 11
};

const { DROPDOWN, MULTI_DROPDOWN, RADIO, CHECKBOX } = QUESTION_TYPE_VALUES;
export const PREREQ_TYPES = [DROPDOWN, MULTI_DROPDOWN, RADIO, CHECKBOX];
