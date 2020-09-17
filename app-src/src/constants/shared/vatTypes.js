import { VAT_TYPES, VAT_TYPE_NAME } from 'constants/companyAdmin/enums';
const { GB, EU, OUTSIDEEU, NOT_REGISTERED_GB, NOT_REGISTERED_OUTSIDEGB } = VAT_TYPES;

export const vatOptions = [
    { label: VAT_TYPE_NAME[GB], value: GB },
    { label: VAT_TYPE_NAME[EU], value: EU },
    { label: VAT_TYPE_NAME[OUTSIDEEU], value: OUTSIDEEU },
    { label: VAT_TYPE_NAME[NOT_REGISTERED_GB], value: NOT_REGISTERED_GB },
    { label: VAT_TYPE_NAME[NOT_REGISTERED_OUTSIDEGB], value: NOT_REGISTERED_OUTSIDEGB },
];

const hasVatCodeTypes = [GB, EU];

export const needsVatCode = type => hasVatCodeTypes.includes(type);
