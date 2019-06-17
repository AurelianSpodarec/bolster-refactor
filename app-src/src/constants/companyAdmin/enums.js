export const ROLE_TYPES = {
    '0': 'Owner',
    '1': 'Admin',
    '2': 'Operative'
};

export const HIERARCHY_TYPES = {
    '1': 'site',
    '2': 'building',
    '3': 'floor',
    '4': 'drawing'
};

export const HIERARCHY_IDS = {
    SITE: '1',
    BUILDING: '2',
    FLOOR: '3',
    DRAWING: '4'
};

export const TEMPLATE_USAGE_RULES = {
    1: 'Use Only Owner Company',
    2: 'Use Only Own',
    3: 'Use Any'
};

export const DOCUMENT_TYPE = {
    '1': 'View only',
    '2': 'Requires agreement (once)',
    '3': 'Requires agreement (multiple)'
};

export const COMPANY_USER_ROLE_TYPES = {
    OWNER: 100,
    ADMIN: 75,
    OPERATIVE: 50
};

export const COMPANY_USER_ROLE_IDS = {
    50: 'Operative',
    75: 'Admin',
    100: 'Owner'
};

export const CREDIT_LOG_TYPES = {
    1: 'Purchased',
    2: 'Free credits from purchase',
    51: 'Used on new drawing',
    52: 'Used to update drawing'
};

export const MESSAGE_TYPES = {
    NOTIFICATION: 1,
    SYSTEM: 20
};

export const ACCESS_TYPES = {
    1: 'Read only',
    10: 'View only',
    50: 'Write',
    100: 'Owner'
};

export const ACCESS_TYPES_VALUES = {
    READ_ONLY: 1,
    VIEW_ONLY: 10,
    WRITE: 50,
    OWNER: 100
};

export const PERMISSION_STATES = {
    PENDING: 0,
    ACCEPTED: 1,
    REJECTED: 2
};

export const SITES_FILTER_TYPES = {
    active: 'Active',
    readonly: 'Read only',
    archived: 'Archived'
};

export const LABEL_TYPES = {
    1: 'Standard',
    2: 'Trim'
};

export const LABEL_TYPES_NUMS = {
    STANDARD: 1,
    TRIM: 2
};

export const LABEL_TYPES_IMAGES = {
    1: '_content/images/labels/standard.png',
    2: '_content/images/labels/trim.png'
};

export const LABEL_QUES_TYPES = {
    1: 'Static',
    2: 'Dynamic'
};

export const LABEL_QUES_TYPES_NUMS = {
    STATIC: 1,
    DYNAMIC: 2
};

export const PIN_STATUS_IDS = {
    ACTION_REQUIRED: 10,
    INSTALLED: 20,
    INSPECTED: 30,
    NO_ACTION: 40,
    OTHER: 50
};

export const PIN_STATUS_TYPES = {
    10: 'Action Required',
    20: 'Installed',
    30: 'Inspected',
    40: 'No Action',
    50: 'Other'
};

export const PIN_STATUS_COLOURS = {
    10: 'red',
    20: 'green',
    30: 'blue',
    40: 'yellow',
    50: 'purple'
};

export const PAYMENT_IDS = {
    CARD: 1,
    INVOICE: 2
};

export const PAYMENT_TYPES = {
    1: 'By Card',
    2: 'By Invoice'
};

export const SUBSCRIPTION_RENEWAL_IDS = {
    CARD: 10,
    INVOICE: 20
};

export const DATE_TIME_IDS = {
    DATETIME: 1,
    DATE: 2,
    TIME: 3
};

export const DATE_TIME_DEFAULTS = {
    1: 'DD/MM/YYYY - HH:mm',
    2: 'DD/MM/YYYY',
    3: 'HH:mm'
};

export const DATE_TIMES = {
    1: 'momentDateTimeFormat',
    2: 'momentDateFormat',
    3: 'momentTimeFormat'
};

export const VAT_TYPES = {
    GB: 1,
    EU: 2,
    OUTSIDEEU: 3
};

//Report generator
export const FURTHER_FILTRATION = {
    1: 'Pin Selection',
    2: 'Filters'
};

export const NUMBER_OF_HISTORIES = {
    3: 'All',
    1: 'Latest',
    2: 'Earliest'
};

export const SORT_BY = {
    1: 'Ascending',
    2: 'Decending'
};

export const REPORT_FORMATS = {
    1: 'pdf',
    2: 'csv'
};

export const GENERATION_STATE_TEXT = {
    0: 'Waiting',
    1: 'Running',
    2: 'Complete',
    3: 'Failed'
};
export const GENERATION_STATE_VAL = {
    WAITING: 0,
    RUNNING: 1,
    COMPLETE: 2,
    FAILED: 3
};

export const SORT_BY_OPTIONS = {
    CREATED_ON_ASC: 1,
    CREATED_ON_DESC: 2,
    PIN_NO_ASC: 3,
    PIN_NO_DESC: 4
};

export const SORT_BY_OPTIONS_TEXT = {
    1: 'Date Created (ascending)',
    2: 'Date Created (descending)',
    3: 'Pin Number (ascending)',
    4: 'Pin Number (descending)'
};

export const LAYOUT_OPTIONS = {
    ONE_COLUMN: 1,
    TWO_COLUMN: 2
};

export const LAYOUT_OPTIONS_TEXT = {
    1: 'One column',
    2: 'Two columns'
};

export const PARENTAL_TYPES = {
    NONE: 1,
    HEADQUARTERS: 2,
    CHILD_COMPANY: 3
};

// adding new dropdown options to these two enum objects will dynamically add a new page for that option. The singular name is for the buttons
export const DROPDOWN_OPTIONS = {
    1: { name: 'FR Ratings', link: 'fr-ratings', singular: 'FR Rating' },
    2: { name: 'Item Types', link: 'item-types', singular: 'Item Type' },
    3: {
        name: 'Installation Types',
        link: 'installation-types',
        singular: 'Installation Type'
    }
};

export const DROPDOWN_OPTION_LOOKUP = {
    'fr-ratings': 1,
    'item-types': 2,
    'installation-types': 3
};

export const DROPDOWN_OPTION_ENUM = {
    1: 'FR Ratings',
    2: 'Item Types',
    3: 'Installation Types'
};
export const DROPDOWN_OPTION_VALS = {
    frRatings: 1,
    itemTypes: 2,
    installationTypes: 3
};

export const FLOORPLAN_STATES = {
    FAILEDCANCELLED: -100,
    FAILEDRETRYING: -1,
    WAITING: 0,
    RUNNING: 1,
    COMPLETE: 100
};

export const FLOORPLAN_STATE_MESSAGES = {
    '-100':
        'An error occurred while uploading your floorplan, please try again.',
    '-1': 'Update failed. Retrying...',
    0: 'Uploading floorplan...',
    1: 'Uploading floorplan...',
    100: ''
};
