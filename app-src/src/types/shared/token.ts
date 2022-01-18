import { CompanyUserType } from './CompanyUserType';

export interface RawJWT {
    ID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    HeadquartersCompanyID?: string;
    HeadquartersCompanyUserID?: string;
    HeadquartersCompanyOperativeCode?: string;
    HeadquartersCompanyUserType?: string;
    CompanyID?: string;
    CompanyUserID?: string;
    CompanyUserOperativeCode?: string;
    CompanyUserType?: string;
    IsClientAccess: string;
    IsCompanyAdmin: string;
    IsSuperAdmin: string;
    exp: number;
    iat: number;
}

export interface JWT {
    id: number;
    isSuperAdmin: boolean;
    isCompanyAdmin: boolean;
    isClientAccess: boolean;
    companyID?: number;
    companyUserID?: number;
    companyUserType?: CompanyUserType;
    headquartersCompanyID?: number;
    headQuartersCompanyUserID?: number;
    headQuartersCompanyUserType?: CompanyUserType;
}
