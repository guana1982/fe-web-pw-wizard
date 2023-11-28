import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TealiumUtagService } from '@bper/npm-core/tealium-utag';
import { GenericObject } from '@shared/models/general.model';
import { take, tap } from 'rxjs/operators';
import { UTagViewDataModel } from "@bper/npm-core/tealium-utag";

const DEFAULT_CONFIG = {
    panelClass: 'dialog-override',
    disableClose: true,
    closeOnNavigation: true
};

@Injectable({
    providedIn: 'root'
})
export class DialogHandlerService {
    private _configurations: MatDialogConfig;

    /**
     * Chiamato per definire le configurazioni della modale
     *
     * @param {MatDialogConfig} configurations Configurazioni per il material dialog, per info vedi documentazione
     * @returns this
     */
    public configure(configurations: Exclude<MatDialogConfig, 'data'> = {}): DialogHandlerService {
        this._configurations = { ...DEFAULT_CONFIG, ...configurations };

        return this;
    }

    /**
     * Analytics. Chiamato se necessario definire un pageId Tealium specifico per la modale
     *
     * @param {string} pageId label utilizzata
     * @param data: UTagViewDataModel
     * @returns this
     */
    public setAnalyticsPageId(pageId: string, data?: UTagViewDataModel): DialogHandlerService {
        this._tealiumHandler.setPageIdForChild(pageId).view(data);
        return this;
    }

    /**
     * utilizzato per utilizzare le configurazioni di default
     *
     * @returns this
     */
    public defaultConfig(): DialogHandlerService {
        this._configurations = { ...DEFAULT_CONFIG };

        return this;
    }

    /**
     * Chiamato sempre dopo uno dei metodi configure o defaultConfig
     *
     * @param {ComponentType} component Componente Dialog da aprire
     * @param {GenericObject} data      oggetto dati da passare all'interno del dialog tramite il mat inject
     * @returns {MatDialogRef}      Ref alla modale aperta a cui sottoscriversi. Es. sottoscrizione al metodo AfterClosed
     */
    public open<T = any, U = GenericObject | undefined>(component: ComponentType<T>, data?: U): MatDialogRef<T> {
        let config = { ...DEFAULT_CONFIG, ...this._configurations };
        if (!!data) config = { ...config, data, maxHeight: '100vh', height: 'unset', disableClose: true };

        const ref = this._dialog.open<T>(component, config);
        ref.afterClosed().pipe(take(1), tap(_ => this._tealiumHandler.closePageIdForChild())).subscribe()

        return ref;
    }

    /**
     * 
     * Funzione che serve per chiudere tutte le modali attive in pagina
     */
    public closeAllModal() {
        this._dialog.closeAll()
    }

    constructor(
        private _dialog: MatDialog,
        private _tealiumHandler: TealiumUtagService
    ) { }
}
