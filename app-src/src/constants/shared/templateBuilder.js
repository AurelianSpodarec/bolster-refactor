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
    '11': 'Status',
    '12': 'Dropdown options',
    '13': 'Multi dropdown options',
    '14': 'Multi multi dropdown',
    '15': 'Multi multi dropdown options'
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
    STATUS: '11',
    DROPDOWN_OPTIONS: '12',
    MULTI_DROPDOWN_OPTIONS: '13',
    MULTI_MULTI_DROPDOWN: '14',
    MULTI_MULTI_DROPDOWN_OPTIONS: '15'
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
    STATUS: 11,
    DROPDOWN_OPTIONS: 12,
    MULTI_DROPDOWN_OPTIONS: 13,
    MULTI_MULTI_DROPDOWN: 14,
    MULTI_MULTI_DROPDOWN_OPTIONS: 15
};

export const STANDARD_LABEL_FIELDS = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8
};

export const TRIM_LABEL_FIELDS = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
};

export const LABEL_STATIC_FIELDS = {
    1: 'Location Owner Company Name',
    101: 'Operative Company Name',
    102: 'Operative First Name',
    103: 'Operative Last Name',
    104: 'Operative Full Name',
    105: 'Operative Code',
    2: 'Location Full Name',
    201: 'Pin Code',
    202: 'Pin Number',
    203: 'Pin Created On',
    3: 'Location Site',
    301: 'History Service',
    302: 'History Status',
    303: 'History Created On',
    4: 'Location Building',
    5: 'Location Floor',
    6: 'Location Drawing'
};

export const LABEL_STATIC_FIELDS_NUMS = {
    HISTORY_CREATED_ON: 303,
    HISTORY_SERVICE: 301,
    HISTORY_STATUS: 302,
    LOCATION_BUILDING: 4,
    LOCATION_DRAWING: 6,
    LOCATION_FLOOR: 5,
    LOCATION_FULL_NAME: 2,
    LOCATION_OWNER_COMPANY_NAME: 1,
    LOCATION_SITE: 3,
    OPERATIVE_CODE: 105,
    OPERATIVE_COMPANY_NAME: 101,
    OPERATIVE_FIRST_NAME: 102,
    OPERATIVE_FULL_NAME: 104,
    OPERATIVE_LAST_NAME: 103,
    PIN_CODE: 201,
    PIN_CREATED_ON: 203,
    PIN_NUMBER: 202
};

export const LABEL_TYPES = {
    1: 'Standard',
    2: 'Trim'
};

export const LABEL_TYPES_NUMS = {
    STANDARD: 1,
    TRIM: 2
};

export const LABEL_QUES_TYPES = {
    1: 'Static',
    2: 'Dynamic'
};

export const LABEL_QUES_TYPES_NUMS = {
    STATIC: 1,
    DYNAMIC: 2
};

const {
    STATUS,
    DROPDOWN,
    MULTI_DROPDOWN,
    RADIO,
    CHECKBOX
} = QUESTION_TYPE_VALUES;

export const PREREQ_TYPES = [STATUS, DROPDOWN, MULTI_DROPDOWN, RADIO, CHECKBOX];
