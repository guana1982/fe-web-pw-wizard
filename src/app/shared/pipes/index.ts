import { FilterObjPipe } from './filter.pipe';
import { GraphDataPipe } from './graphData.pipe';
import { Paginator } from './paginator.pipe';
import { PercentagePipe } from './percentage.pipe';
import { ShortNumberPipe } from './short-number.pipe';
import { TruncateText } from './truncate.pipe';
import { TransactionAmountPipe } from "@shared/pipes/transactionAmount.pipe";
import { DateToTextPipe } from './dateToText.pipe';
import { CmsTranslatePipe } from './cms-translate.pipe';
import { JsonParsePipe } from './jsonParse.pipe';
import { SafePipe } from './safe.pipe';

export const sharedPipesList: any[] = [
    FilterObjPipe, 
    GraphDataPipe, 
    Paginator, 
    PercentagePipe, 
    ShortNumberPipe, 
    TransactionAmountPipe, 
    TruncateText,
    DateToTextPipe,
    CmsTranslatePipe,
    JsonParsePipe,
    SafePipe
];

export * from './filter.pipe';
export * from './graphData.pipe';
export * from './paginator.pipe';
export * from './percentage.pipe';
export * from './short-number.pipe';
export * from './transactionAmount.pipe';
export * from './truncate.pipe';
export * from './dateToText.pipe';
export * from './cms-translate.pipe';
export * from './jsonParse.pipe';
export * from './safe.pipe';
