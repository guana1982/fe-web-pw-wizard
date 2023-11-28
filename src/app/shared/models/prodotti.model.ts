export interface BankAccountId {
    bankCode: string;
    branchCode: string;
    code: string;
}

export interface BankAccount {
    currency: string;
    customizedName: string;
    holder: string;
    ibanCode: string;
    id: BankAccountId;
    name: string;
    openingDate: string;
    preferred: boolean;
    productId: number;
    productType: string;
}

export interface BankAccountDetails {
    accordedLoan: number;
    accountDescription: string;
    accountId: BankAccountId;
    accountType: string;
    accountingBalance: number;
    availableBalance: number;
    balancesDate: string;
    currency: string;
    customizedName: string;
    debitInterestDue: number;
    demobilizedLoan: number;
    diPiuServiceFlag: false;
    holder: string;
    ibanCode: string;
    id: BankAccountId;
    name: string;
    openingDate: string;
    preferred: boolean;
    presentationTotal: number;
    productId: number;
    productType: string;
    restrictedBalance: number;
    usedLoan: number;
}