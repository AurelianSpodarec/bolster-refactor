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

export const CREDIT_LOG_TYPES = {
    1: 'Purchased',
    2: 'Unused new drawing',
    3: 'Used update drawing'
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

export const LABEL_TYPES = {
    1: 'Standard',
    2: 'Trim'
};

export const PIN_STATUS_IDS = {
    INSTALLED: 10,
    INSPECTED: 20,
    NO_ACTION: 30,
    ACTION_REQUIRED: 40,
    OTHER: 50
};

export const PIN_STATUS_TYPES = {
    10: 'Installed',
    20: 'Inspected',
    30: 'No Action Required',
    40: 'Action Required',
    50: 'Other'
};

export const PIN_STATUS_COLOURS = {
    10: 'green',
    20: 'blue',
    30: 'yellow',
    40: 'red',
    50: 'purple'
};
