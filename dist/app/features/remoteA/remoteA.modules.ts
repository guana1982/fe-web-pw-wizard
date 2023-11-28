import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PwStepConvalidaCellulareComponent } from './polo-welth/wizard-bcp/pw-step-convalida-cellulare/pw-step-convalida-cellulare.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteARoutingModule } from './remoteA.routing.module';
import { SharedModule } from '@shared/shared.module';
import { PoloWelthComponent } from './polo-welth/polo-welth.component';
import { PwStepIntroduzioneComponent } from './polo-welth/wizard-bcp/pw-step-introduzione/pw-step-introduzione.component';
import { PwStepIdentificazioneClienteComponent } from './polo-welth/wizard-bcp/pw-step-identificazione-cliente/pw-step-identificazione-cliente.component';
import { PwStepProfilazioneClienteComponent } from './polo-welth/wizard-bcp/pw-step-profilazione-cliente/pw-step-profilazione-cliente.component';
import { PwStepDocPrecontrattualeComponent } from './polo-welth/wizard-bcp/pw-step-doc-precontrattuale/pw-step-doc-precontrattuale.component';
import { PwStepRiepilogoComponent } from './polo-welth/wizard-bcp/pw-step-riepilogo/pw-step-riepilogo.component';
import { ModalInfoSicurezzaComponent } from './polo-welth/wizard-bcp/pw-step-riepilogo/modal-info-sicurezza/modal-info-sicurezza.component';
import { ModalInfoProfiloComponent } from './polo-welth/wizard-bcp/pw-step-profilazione-cliente/modal-info-profilo/modal-info-profilo.component';
import { ModalSetInformativoComponent } from './polo-welth/wizard-bcp/pw-step-doc-precontrattuale/modal-set-informativo/modal-set-informativo.component';
import { PwStepPrimoAccessoComponent } from './polo-welth/wizard-bcp/pw-step-primo-accesso-credenziali/pw-step-primo-accesso-credenziali';
import { PwStepNuoveCredenzialiComponent } from './polo-welth/wizard-bcp/pw-step-nuove-credenziali/pw-step-nuove-credenziali.component';
import { PwStepCertificazioneEmailComponent } from './polo-welth/wizard-bcp/pw-step-certificazione-email/pw-step-certificazione-email.component';
import { ModalEmailComponent } from './polo-welth/wizard-bcp/pw-step-certificazione-email/modal-email/modal-email.component';
import { PwStepModalEmailIdentificazioneClienteComponent } from './polo-welth/wizard-bcp/pw-step-identificazione-cliente/modal-email/modal-email-identificazione-cliente.component';
import { PwStepConvalidaEmailIdentificazioneClienteComponent } from './polo-welth/wizard-bcp/pw-step-identificazione-cliente/convalida-email/convalida-email-identificazione-cliente.component';
import { ModalScopriDiPiùComponent } from './polo-welth/wizard-bcp/pw-step-profilazione-cliente/modal-scopri-di-più/modal-scopri-di-più.component';
import { ErroreConvalidaEmailComponent } from './polo-welth/shared/components/errore-convalida-email/errore-convalida-email.component';
import { PwStepFirmaComponent } from './polo-welth/wizard-bcp/pw-step-firma/pw-step-firma.component';
import { ErroreCriticoComponent } from './polo-welth/shared/components/errore-critico/errore-critico.component';
import { PwStepBuonFineFirmaComponent } from './polo-welth/wizard-bcp/pw-step-buon-fine-firma/pw-step-buon-fine-firma.component';
import { PwStepDownloadBustaPasswordComponent } from './polo-welth/wizard-bcp/pw-step-download-busta-password/pw-step-download-busta-password.component';
import { PwStepThankYouPageComponent } from './polo-welth/wizard-bcp/pw-step-thank-you-page/pw-step-thank-you-page.component';
import { PwStepUtentiMigratiComponent } from './polo-welth/wizard-bcp/pw-step-utenti-migrati/pw-step-utenti-migrati.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalViewDocComponent } from './polo-welth/wizard-bcp/pw-step-doc-precontrattuale/modal-view-doc/modal-view-doc.component';
import { HttpHandlerService } from '@core/services/http/http-handler.service';
import { MessageHandlerComponent } from './polo-welth/shared/components/message-handler/message-handler.component';
import { ErroreDashboardComponent } from './polo-welth/shared/components/errore-dashboard/errore-dashboard.component';

@NgModule({
    imports: [CommonModule, RemoteARoutingModule, SharedModule, ReactiveFormsModule, MatCheckboxModule, PdfViewerModule],
    declarations: [
        PoloWelthComponent,
        PwStepIntroduzioneComponent,
        PwStepIdentificazioneClienteComponent,
        PwStepProfilazioneClienteComponent,
        PwStepDocPrecontrattualeComponent,
        PwStepNuoveCredenzialiComponent,
        PwStepPrimoAccessoComponent,
        PwStepConvalidaCellulareComponent,
        PwStepCertificazioneEmailComponent,
        PwStepFirmaComponent,
        PwStepRiepilogoComponent,
        PwStepThankYouPageComponent,
        ModalInfoSicurezzaComponent,
        PwStepUtentiMigratiComponent,
        ModalInfoProfiloComponent,
        ModalScopriDiPiùComponent,
        ErroreConvalidaEmailComponent,
        ErroreCriticoComponent,
        ErroreDashboardComponent,
        MessageHandlerComponent,
        ModalSetInformativoComponent,
        ModalViewDocComponent,
        ModalEmailComponent,
        PwStepDownloadBustaPasswordComponent,
        PwStepModalEmailIdentificazioneClienteComponent,
        PwStepConvalidaEmailIdentificazioneClienteComponent,
        PwStepBuonFineFirmaComponent,
    ],
    providers: [HttpHandlerService]
})
export class RemoteAModule {}
