import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BperRoute } from '@bper/npm-core/models';
import { PoloWelthComponent } from './polo-welth/polo-welth.component';
import { ErroreConvalidaEmailComponent } from './polo-welth/shared/components/errore-convalida-email/errore-convalida-email.component';
import { ErroreCriticoComponent } from './polo-welth/shared/components/errore-critico/errore-critico.component';
import { ErroreDashboardComponent } from './polo-welth/shared/components/errore-dashboard/errore-dashboard.component';

const routes: BperRoute[] = [
    {
        path: '',
        component: PoloWelthComponent
    },
    {
        path: 'error',
        component: ErroreConvalidaEmailComponent
    },
    {
        path: 'error-critic',
        component: ErroreCriticoComponent
    },
    {
        path: 'error-dashboard',
        component: ErroreDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class RemoteARoutingModule {}
