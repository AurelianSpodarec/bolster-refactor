export const ROLE_TYPES = {
    0: 'Owner',
    1: 'Admin',
    2: 'Operative',
    3: 'Client',
};

export const HIERARCHY_TYPES = {
    1: 'site',
    2: 'building',
    3: 'floor',
    4: 'drawing',
    100: 'all sites',
};

export const HIERARCHY_IDS = {
    SITE: 1,
    BUILDING: 2,
    FLOOR: 3,
    DRAWING: 4,
    ALL_SITES: 100,
};

export const TEMPLATE_USAGE_RULES = {
    1: 'Use Only Owner Company',
    2: 'Use Only Own',
    3: 'Use Any',
};

export const TEMPLATE_USAGE_RULES_VALUES = {
    ONLY_OWNER_COMPANY: 1,
    ONLY_OWN: 2,
    USE_ANY: 3,
};

export const DOCUMENT_TYPE = {
    1: 'View only',
    2: 'Requires agreement (once)',
    3: 'Requires agreement (multiple)',
};

export const COMPANY_USER_ROLE_TYPES = {
    OWNER: 100,
    ADMIN: 75,
    OPERATIVE: 50,
    CLIENT: 25,
    DELETED: 1000,
};

export const COMPANY_USER_ROLE_IDS = {
    25: 'Client Access',
    50: 'Operative',
    75: 'Admin',
    100: 'Owner',
    1000: 'Deleted',
};

export const COMPANY_USER_ROLE_STATUS_VALUES = {
    1: 'Invited',
    2: 'Active',
    3: 'Inactive',
    4: 'Disabled',
    5: 'Deleted',
};

export const CREDIT_LOG_TYPES = {
    1: 'Purchased',
    2: 'Free credits from purchase',
    3: 'Used to reactivate drawing',
    4: 'Used to extend drawing',
    51: 'Used on new drawing',
    52: 'Used to update drawing',
};

export const MESSAGE_TYPES = {
    NOTIFICATION: 1,
    SYSTEM: 20,
};

export const ACCESS_TYPES = {
    1: '(Read only)',
    10: '(View only)',
    50: '',
    100: '(Owner)',
};

export const ACCESS_TYPES_VALUES = {
    READ_ONLY: 1,
    VIEW_ONLY: 10,
    WRITE: 50,
    OWNER: 100,
};

export const PERMISSION_STATES = {
    PENDING: 0,
    ACCEPTED: 1,
    REJECTED: 2,
};

export const SITES_FILTER_TYPES = {
    active: 'Active',
    readonly: 'Read only',
    archived: 'Archived',
};

export const LABEL_TYPES = {
    1: 'Standard',
    2: 'Trim',
};

export const LABEL_TYPES_NUMS = {
    STANDARD: 1,
    TRIM: 2,
};

export const LABEL_TYPES_IMAGES = {
    1: '_content/images/labels/standard.png',
    2: '_content/images/labels/trim.png',
};

export const LABEL_QUES_TYPES = {
    1: 'Static',
    2: 'Dynamic',
};

export const LABEL_QUES_TYPES_NUMS = {
    STATIC: 1,
    DYNAMIC: 2,
};

export const PIN_STATUS_IDS = {
    ACTION_REQUIRED: 10,
    INSTALLED: 20,
    INSPECTED: 30,
    NO_ACTION: 40,
    OTHER: 50,
};

export const PIN_STATUS_TYPES = {
    10: 'Action Required',
    20: 'Installed',
    30: 'Inspected',
    40: 'No Action',
    50: 'Other',
};

export const STATUS_TO_STATS = {
    10: 'ActionRequired',
    20: 'Installed',
    30: 'Inspected',
    40: 'NoAction',
    50: 'Other',
};

export const PIN_STATUS_COLOURS = {
    10: 'red',
    20: 'green',
    30: 'blue',
    40: 'yellow',
    50: 'purple',
};

export const PAYMENT_IDS = {
    CARD: 1,
    INVOICE: 2,
};

export const PAYMENT_TYPES = {
    1: 'By Card',
    2: 'By Invoice',
};

export const INVOICE_TYPES = {
    1: 'Bank transfer',
    2: 'Card',
    3: 'Free',
};

export const SUBSCRIPTION_RENEWAL_IDS = {
    CARD: 10,
    INVOICE: 20,
};

export const DATE_TIME_IDS = {
    DATETIME: 1,
    DATE: 2,
    TIME: 3,
};

export const DATE_TIME_DEFAULTS = {
    1: 'DD/MM/YYYY - HH:mm',
    2: 'DD/MM/YYYY',
    3: 'HH:mm',
};

export const DATE_TIMES = {
    1: 'momentDateTimeFormat',
    2: 'momentDateFormat',
    3: 'momentTimeFormat',
};

export const VAT_TYPES = {
    GB: 1,
    EU: 2,
    OUTSIDEEU: 3,
    NOT_REGISTERED_GB: 4,
    NOT_REGISTERED_OUTSIDEGB: 5,
};

export const VAT_TYPE_NAME = {
    1: 'GB',
    2: 'Europe',
    3: 'Rest of the World',
    4: 'Not Registered (GB)',
    5: 'Not Registered (Outside GB)',
};

//Report generator
export const FURTHER_FILTRATION = {
    1: 'Individual Pins',
    2: 'Pin Selector',
    3: 'Advanced',
    4: 'Zones',
};

export const FURTHER_FILTRATION_OPTIONS = {
    NONE: 0,
    INDIVIDUAL_PINS: 1,
    PIN_SELECTOR: 2,
    FILTERS: 3,
    ZONES: 4,
};

export const NUMBER_OF_HISTORIES = {
    1: 'Latest',
    2: 'Earliest',
    3: 'All',
};

export const NUMBER_OF_HISTORIES_WITH_DATE = {
    1: 'Latest',
    2: 'Earliest',
    3: 'All',
    4: 'All histories within set date range',
};

export const NUMBER_OF_HISTORIES_OPTIONS = {
    LATEST: 1,
    EARLIEST: 2,
    ALL: 3,
    ALLWHERELATESTINDATERANGE: 4,
};

export const SORT_BY = {
    1: 'Ascending',
    2: 'Decending',
};

export const REPORT_FORMATS = {
    1: 'pdf',
    2: 'csv',
};

export const GENERATION_STATE_TEXT = {
    0: 'Waiting',
    1: 'Running',
    2: 'Complete',
    3: 'Failed',
    4: 'Deleted',
};
export const GENERATION_STATE_VAL = {
    WAITING: 0,
    RUNNING: 1,
    COMPLETE: 2,
    FAILED: 3,
    DELETED: 4,
};

export const SORT_BY_OPTIONS = {
    CREATED_ON_ASC: 1,
    CREATED_ON_DESC: 2,
    PIN_NO_ASC: 3,
    PIN_NO_DESC: 4,
    DRAWING_ASC: 5,
    DRAWING_DESC: 6,
};

export const SORT_BY_OPTIONS_TEXT = {
    1: 'Date Created (ascending)',
    2: 'Date Created (descending)',
    3: 'Pin Number (ascending)',
    4: 'Pin Number (descending)',
    5: 'Site/Building/Floor/Drawing (ascending)',
    6: 'Site/Building/Floor/Drawing (descending)',
};

export const LAYOUT_OPTIONS = {
    ONE_COLUMN: 1,
    TWO_COLUMN: 2,
};

export const LAYOUT_OPTIONS_TEXT = {
    1: 'One column',
    2: 'Two columns',
};

export const PARENTAL_TYPES = {
    NONE: 1,
    HEADQUARTERS: 2,
    CHILD_COMPANY: 3,
};

/*  adding new dropdown options to these two enum objects
    will dynamically add a new page for that option. */
export const DROPDOWN_OPTIONS = {
    1: { name: 'FR Ratings', link: 'fr-ratings', singular: 'FR Rating', reduxKey: 'frRatings' },
    2: { name: 'Item Types', link: 'item-types', singular: 'Item Type', reduxKey: 'itemTypes' },
    3: {
        name: 'Installation Types',
        link: 'installation-types',
        singular: 'Installation Type',
        reduxKey: 'installationTypes',
    },
};

export const DROPDOWN_OPTION_LOOKUP = {
    'fr-ratings': 1,
    'item-types': 2,
    'installation-types': 3,
};

export const DROPDOWN_OPTION_ENUM = {
    1: 'FR Ratings',
    2: 'Item Types',
    3: 'Installation Types',
};
export const DROPDOWN_OPTION_VALS = {
    frRatings: 1,
    itemTypes: 2,
    installationTypes: 3,
};

export const DROPDOWN_OPTION_MANUFACTURER_ENABLED = {
    1: false,
    2: false,
    3: true,
};

export const FLOORPLAN_STATES = {
    FAILEDCANCELLED: -100,
    FAILEDRETRYING: -1,
    WAITING: 0,
    RUNNING: 1,
    COMPLETE: 100,
};

export const FLOORPLAN_STATE_MESSAGES = {
    '-100': 'An error occurred while uploading your floorplan, please try again.',
    '-1': 'Update failed. Retrying...',
    0: 'Uploading floorplan...',
    1: 'Uploading floorplan...',
    100: '',
};

export const DRAWINGS_STATE_MESSAGES = {
    '-100': 'Failed',
    '-1': 'Failed',
    0: 'Uploading',
    1: 'Uploading',
    100: 'Successfully uploaded',
};

export const RECTANGLE_MODES = {
    NONE: 0,
    ADD: 1,
    DELETE: 2,
    EXCLUDE: 3,
};

export const INVOICE_STATUS_TYPES = {
    ALL: 0,
    PAID: 1,
    UNPAID: 2,
    FREE: 3,
};

export const COMPANY_TYPES = {
    ALL: 0,
    'Company - Active Subscription': 1,
    'Company - Expired Subscription': 2,
    'Client Access': 3,
};

export const COMPANY_TRACKING_TYPES_VALUES = {
    0: 'All',
    1: 'Active',
    2: 'Expired',
    3: 'Client Access',
};

export const DELETED_DATA_TYPE = {
    drawing: 'Drawing',
    floor: 'Floor',
    building: 'Building',
    site: 'Site',
    users: 'User',
    pinHistory: 'Pin History',
    operativepermissions: 'Operative Drawing Permission',
};

export const getEnumKey = (enumerable, num) =>
    // ? faster?
    // Object.keys(enumerable).find(val => val === num);
    // eslint-disable-next-line no-unused-vars
    (Object.entries(enumerable).find(([_, value]) => value === num) || {})[0];

export const FETCH_STATUS = {
    NONE: 1,
    PARTIAL: 2,
    FULL: 3,
};

export const DEFAULT_SITES_SORT = {
    CUSTOM: 1,
    DATE_ASC: 2,
    DATE_DESC: 3,
    NAME_ASC: 4,
    NAME_DESC: 5,
};

export const DEFAULT_SITES_SORT_NAMES = {
    1: 'Custom',
    2: 'Date Ascending',
    3: 'Date Descending',
    4: 'Name Ascending',
    5: 'Name Descending',
};

export const HAS_PAID_QUERIES = {
    0: undefined,
    1: 'true',
    2: 'false',
    3: 'true',
};

export const HAS_PAID_VALUES = {
    ALL: 0,
    PAID: 1,
    AWAITING_PAYMENT: 2,
    FREE: 3,
};

export const DOCUMENT_TYPES = {
    VIEW_ONLY: '1',
    REQUIRES_AGREEMENT_ONCE: '2',
    REQUIRES_AGREEMENT_MULTIPLE: '3',
};

export const DOCUMENT_VIEW_TYPES = {
    IMAGE: 0,
    PDF: 1,
};

export const DOCUMENT_VISIBILITY = {
    VISIBLE_TO_ALL: 1,
    VISIBLE_TO_OWN_COMPANY: 2,
    VISIBLE_TO_SELECT_OPERATIVES: 3,
};

export const IMAGE_VISUAL_POSITION = {
    0: 'top',
    1: 'right',
    2: 'bottom',
    3: 'left',
};

export const ACTIVITY_LOG_ACTION_TYPES = {
    CREATE: 1,
    UPDATE: 2,
    DELETE: 3,
};

export const ACTIVITY_LOG_ACTION_VALUES = {
    1: 'Create',
    2: 'Update',
    3: 'Delete',
};

export const ACTIVITY_LOG_REFERENCE_TYPES = {
    SITE: 1,
    BUILDING: 2,
    FLOOR: 3,
    DRAWING: 4,
};

export const ACTIVITY_LOG_REFERENCE_VALUES = {
    1: 'Site',
    2: 'Building',
    3: 'Floor',
    4: 'Drawing',
};

export const COMPANY_REPORTS_OUTPUT_TYPES = {
    isCSVGeneration: 'CSV',
    isPDFGeneration: 'PDF',
    isFloorplanGeneration: 'Floor Plan',
    isOEMManualGeneration: 'O&M Manual',
};

export const CLOCKER_ENTRY_TYPE = {
    WORKING: 1,
    ON_BREAK: 2,
};

export const PIN_STATS_DASHBOARD_VIEW = {
    CALENDAR: 'calendar',
    LIST: 'list',
    SERIES: 'series',
};

export const TIME_PERIOD = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
};

export const RECURRING_TYPE = {
    NONE: 0,
    WEEKLY: 1,
    MONTHLY: 2,
    DAILY: 3,
};

export const DAY = {
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY',
    SUNDAY: 'SUNDAY',
};

export const DAYS_FLAGGED = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 4,
    THURSDAY: 8,
    FRIDAY: 16,
    SATURDAY: 32,
    SUNDAY: 64,
};
export const DAYS_FLAGGED_LOOKUP = {
    1: 'MONDAY',
    2: 'TUESDAY',
    4: 'WEDNESDAY',
    8: 'THURSDAY',
    16: 'FRIDAY',
    32: 'SATURDAY',
    64: 'SUNDAY',
};

export const PIN_TASK_STATUS = {
    COMPLETE: 'complete',
    COMPLETE_LATE: 'complete_late',
    DUE_SOON: 'due_soon',
    INCOMPLETE: 'incomplete',
};

export const PIN_TASK_STATUS_NAMES = {
    COMPLETE: 'Complete',
    COMPLETE_LATE: 'Complete (Late)',
    DUE_SOON: 'Due Soon',
    INCOMPLETE: 'Incomplete',
};

export const PIN_TASK_RECURRING = {
    RECURRING: 'recurring',
    NON_RECURRING: 'non_recurring',
};

export const PIN_TASK_RECURRING_NAMES = {
    RECURRING: 'Recurring',
    NON_RECURRING: 'Non-Recurring',
};

export const DOCUMENT_LIBRARY_TYPES = {
    FOLDER: 100,
    FILE: 200,
};
