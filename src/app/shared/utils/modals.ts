import { MatDialog } from '@angular/material/dialog';

export interface IOpenDialog {
    dialog: MatDialog;
    openDialog(component, opt, cbSubscribe): void;
}

/**
 * @param  {} component     componente da aprire come Modal
 * @param  {} opt           opzioni da passare al material Modal
 * @param  {} cbSubscribe   callback da eseguire alla chiusura del modale
 */
export function openModal(component, opt, cbSubscribe): void {
    opt = opt || {};
    opt.panelClass || (opt.panelClass = 'dialog-override');
    opt.disableClose || (opt.disableClose = false); // default true
    opt.closeOnNavigation = true;

    const dialogRef = this.dialog.open(component, opt);

    const subscriber = dialogRef.afterClosed().subscribe(change => {
        cbSubscribe && cbSubscribe(change);
        subscriber.unsubscribe();
    });
}
