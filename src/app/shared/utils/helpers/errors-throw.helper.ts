import { throwError } from 'rxjs';

export const ExecuteOrThrowErrorObservable$ = (cb: () => any) => {
    try {
        return cb();
    } catch (error) {
        return throwError(() => error);
    }
};
