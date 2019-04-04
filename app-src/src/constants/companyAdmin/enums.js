export const ROLE_TYPES = {
    '0': 'Owner',
    '1': 'Admin',
    '2': 'Operative'
};

export const HIERARCHY_TYPE = {
    '1': 'Site',
    '2': 'Building',
    '3': 'Floor',
    '4': 'Drawing'
};

export const HIERARCHY_IDS = {
    Site: '1',
    Building: '2',
    Floor: '3',
    Drawing: '4'
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

export const PERMISSION_STATES = {
    PENDING: 0,
    ACCEPTED: 1,
    REJECTED: 2
};

export const LABEL_TYPES = {
    1: 'Standard',
    2: 'Trim'
};
