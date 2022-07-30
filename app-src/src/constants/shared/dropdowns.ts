import { convertEnumToDropdownOptions } from 'helpers/generic';

import { MEASUREMENT_VALUES } from 'constants/companyAdmin/enums';

export const measurementDropdownOptions = convertEnumToDropdownOptions(MEASUREMENT_VALUES);
