import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.services';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { DownloadBustaPasswordService } from './service/download-busta-password.service';
import { aliasUtenteInterface } from '../pw-step-nuove-credenziali/models/nuove-credenziali.model';
import { Observable } from 'rxjs';
import { DownloadResourcesService } from '@bper/npm-core/utilities/downloader';
import { Router } from '@angular/router';

@Component({
    selector: 'pw-step-download-busta-password',
    templateUrl: './pw-step-download-busta-password.component.html',
    styleUrls: ['./pw-step-download-busta-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DownloadBustaPasswordService]
})
export class PwStepDownloadBustaPasswordComponent implements OnInit {
    goConcludi: boolean = false;
    file: any;

    constructor(
        private stepService: StepService,
        private _loaderService: LoaderService,
        private downloadBustaPasswordService: DownloadBustaPasswordService,
        private cdr: ChangeDetectorRef,
        private _downloadResourcesService: DownloadResourcesService,
        private router: Router
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    goToNextStep(): void {
        this.stepService.goToNextStep();
    }

    public downloadPdf(): any {
        this.goConcludi = true;
        this._downloadResourcesService.downloadResources(this.file.nomeFile, this.file.base64);
    }

    ngOnInit(): void {
        this._loaderService.loading();
        this.downloadBustaPasswordService.getFileDownloadBustaPassword().subscribe(
            (data: any) => {
                const { nomeFile, base64 } = data;
                this.file = { ...this.file, nomeFile, base64 };
                console.log('File busta password: ', this.file);
                this._loaderService.success();
                this.cdr.detectChanges();
            },
            (error: any) => {
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error("Errore durante il recupero dell'alias utente", error);
            }
        );
    }
}
