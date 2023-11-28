import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
    {
        path: 'web-pw-wizard',
        loadChildren: () => import('./features/remoteA/remoteA.modules').then(m => m.RemoteAModule)
    },
    // ALL -> REDIRECT TO NOT FOUND - 404
    {
        path: '**',
        redirectTo: 'errore'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'web-pw-wizard'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}
