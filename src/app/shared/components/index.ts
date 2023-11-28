import { BperBoxComponent } from './bper-box/bper-box.component';

import { BperStep } from './bper-steps/bper-step.component';
import { ErroreCaricamentoDatiComponent } from '@shared/components/errore-caricamento-dati/errore-caricamento-dati.component';
import { BperTitleComponent } from '@shared/components/bper-title/bper-title.component';
import { BperStepsComponent } from './bper-steps/bper-steps.component';
import { BperButtonComponent } from './bper-button/bper-button.component';
import { BperCardBoxComponent } from './bper-card-box/bper-card-box.component';
import { BperLineSkeletonComponent } from './skeletons/bper-line-skeleton/bper-line-skeleton.component';
import { ModalPdfComponent } from './modals/components/modal-pdf/modal-pdf.component';
import { BperCheckInformativaComponent } from './bper-check-informativa/bper-check-informativa.component';
import { BperCheckboxComponent } from './bper-form/bper-checkbox/component/bper-checkbox.component';
import { BperCardComponent } from './bper-card/bper-card.component';
import { BperRadioComponent } from './bper-form/bper-radio/component/bper-radio.component';
import { ModalAutorizzaOperazioneComponent } from './modals/components/modal-autorizza-operazione/modal-autorizza-operazione.component';
import { ModalConfermaAccessoComponent } from './modals/components/modal-conferma-accesso/modal-conferma-accesso.component';
import { ModalGeneraOtpComponent } from './modals/components/modal-genera-otp/modal-genera-otp.component';
import { ModalSessioneInScadenzaComponent } from './modals/components/modal-sessione-in-scadenza/modal-sessione-in-scadenza.component';
import { ModalGeneraOtpLoginComponent } from './modals/components/modal-genera-otp-login/modal-genera-otp-login.component';
import { ModalInserisciPinComponent } from './modals/components/modal-inserisci-pin/modal-inserisci-pin.component';
import { ModalAccessoNegatoComponent } from './modals/components/modal-accesso-negato/modal-accesso-negato.component';
import { ModalInformativaComponent } from './modals/components/modal-informativa/modal-informativa.component';
import { BperTagComponent } from './bper-tag/bper-tag.component';

import { BperCardFirmaComponent } from './bper-card-firma/bper-card-firma.component';
import { BperSessionExpiredComponent } from './bper-session-expired/bper-session-expired.component';
import { BperQRCodeComponent } from './bper-qrcode/bper-qrcode.component';
import { BperModalBComponent } from './bper-modal-b/bper-modal-b.component';
import { BperCarouselComponent } from './bper-carousel/bper-carousel.component';
import { BperCarouselSlideComponent } from './bper-carousel/slide/bper-carousel-slide.component';
import { BperCardPaymentComponent } from './bper-card-payment/bper-card-payment.component';
import { BperModalComponent } from './bper-modal/bper-modal.component';
import { BperEsitoComponent } from './bper-esito/bper-esito.component';
import { BperInputTextComponent } from './bper-form/bper-input/bper-input-text/component/bper-input-text.component';
import { BperInputPinCodeComponent } from './bper-form/bper-input/bper-input-pincode/component/bper-input-pincode.component';
import { BperInputPasswordComponent } from './bper-form/bper-input/bper-input-password/component/bper-input-password.component';
import { ModalCobrowsingComponent } from './modals/components/modal-cobrowsing/modal-cobrowsing.component';

export const sharedComponentsList: any[] = [
    BperBoxComponent,
    BperStep,
    BperStepsComponent,
    ErroreCaricamentoDatiComponent,
    BperTitleComponent,
    BperButtonComponent,
    BperCardBoxComponent,
    BperLineSkeletonComponent,
    ModalPdfComponent,
    BperCheckInformativaComponent,
    BperCheckboxComponent,
    BperCardComponent,
    BperRadioComponent,
    BperInputTextComponent,
    BperInputPinCodeComponent,
    BperInputPasswordComponent,
    // Bper
    BperTagComponent,
    BperCardFirmaComponent,
    BperSessionExpiredComponent,
    BperQRCodeComponent,
    BperModalBComponent,
    BperCarouselComponent,
    BperCarouselSlideComponent,
    BperCardPaymentComponent,
    BperModalComponent,
    BperEsitoComponent,
    // Modals,
    ModalAutorizzaOperazioneComponent,
    ModalConfermaAccessoComponent,
    ModalGeneraOtpComponent,
    ModalSessioneInScadenzaComponent,
    ModalGeneraOtpLoginComponent,
    ModalInserisciPinComponent,
    ModalAccessoNegatoComponent,
    ModalInformativaComponent,
    ModalPdfComponent,
    ModalCobrowsingComponent
];

export * from './bper-box/bper-box.component';
export * from './bper-steps/bper-step.component';
