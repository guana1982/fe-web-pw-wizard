import { ModalCobrowsingComponent } from './../../../../shared/components/modals/components/modal-cobrowsing/modal-cobrowsing.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TealiumUtagService, UTagViewDataModel } from '@bper/npm-core/tealium-utag';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';

@Component({
    selector: 'cobrowsing',
    templateUrl: './cobrowsing.component.html',
    styleUrls: ['./cobrowsing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowsingComponent {
    iconCobrowsing =
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjcwIgogICBoZWlnaHQ9IjQ2IgogICB2aWV3Qm94PSIwIDAgNzAgNDYiCiAgIGZpbGw9Im5vbmUiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzMxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJHcm91cCA1Mzg3YS5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMi4xICg5YzZkNDFlNDEwLCAyMDIyLTA3LTE0KSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzMzIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjguNzg3MjM0IgogICAgIGlua3NjYXBlOmN4PSIzNC45OTM5NDciCiAgICAgaW5rc2NhcGU6Y3k9IjEzLjcxMzA3NSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAxMyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTkiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii05IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMzEiIC8+CiAgPGcKICAgICBpZD0iZzQiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI0LC04KSI+CiAgICA8cGF0aAogICAgICAgZmlsbC1ydWxlPSJldmVub2RkIgogICAgICAgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgZD0iTSAyNCw1NCBWIDE1IGMgMCwtMy44NjYgMy4xMzQsLTcgNywtNyBoIDU2IGMgMy44NjYsMCA3LDMuMTM0IDcsNyB2IDM5IHoiCiAgICAgICBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMzI0XzQ5KSIKICAgICAgIGlkPSJwYXRoMiIKICAgICAgIHN0eWxlPSJmaWxsOnVybCgjcGFpbnQwX2xpbmVhcl8zMjRfNDkpIiAvPgogIDwvZz4KICA8cmVjdAogICAgIHg9IjIzLjc1IgogICAgIHk9IjEzLjc1IgogICAgIHdpZHRoPSIyMi4yNiIKICAgICBoZWlnaHQ9IjE1LjIyIgogICAgIHJ4PSIyLjI1IgogICAgIHN0cm9rZT0iI2UwZWNlYyIKICAgICBzdHJva2Utd2lkdGg9IjEuNSIKICAgICBpZD0icmVjdDYiIC8+CiAgPGxpbmUKICAgICB4MT0iMzAuNzkwMDAxIgogICAgIHkxPSIzNC4yNSIKICAgICB4Mj0iMzguOTcwMDAxIgogICAgIHkyPSIzNC4yNSIKICAgICBzdHJva2U9IiNlMGVjZWMiCiAgICAgc3Ryb2tlLXdpZHRoPSIxLjUiCiAgICAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogICAgIGlkPSJsaW5lOCIgLz4KICA8bGluZQogICAgIHgxPSIzMy40Mjk5MDEiCiAgICAgeTE9IjI5LjcyMDY5OSIKICAgICB4Mj0iMzMuNDI5OTAxIgogICAgIHkyPSIzNC4xMjA3MDEiCiAgICAgc3Ryb2tlPSIjZTBlY2VjIgogICAgIHN0cm9rZS13aWR0aD0iMS41IgogICAgIGlkPSJsaW5lMTAiIC8+CiAgPGxpbmUKICAgICB4MT0iMzYuOTUwMDAxIgogICAgIHkxPSIyOS43MjA2OTkiCiAgICAgeDI9IjM2Ljk1MDAwMSIKICAgICB5Mj0iMzQuMTIwNzAxIgogICAgIHN0cm9rZT0iI2UwZWNlYyIKICAgICBzdHJva2Utd2lkdGg9IjEuNSIKICAgICBpZD0ibGluZTEyIiAvPgogIDxjaXJjbGUKICAgICBjeD0iMzAuNzAwMTk5IgogICAgIGN5PSIyMC43MDIxMDEiCiAgICAgcj0iMS41NCIKICAgICBmaWxsPSIjZTBlY2VjIgogICAgIGlkPSJjaXJjbGUxNCIgLz4KICA8Y2lyY2xlCiAgICAgY3g9IjM3Ljc0MDIiCiAgICAgY3k9IjE4LjA2MTUwMSIKICAgICByPSIxLjU0IgogICAgIGZpbGw9IiNlMGVjZWMiCiAgICAgaWQ9ImNpcmNsZTE2IiAvPgogIDxjaXJjbGUKICAgICBjeD0iMzcuNzQwMiIKICAgICBjeT0iMjQuMjIxNiIKICAgICByPSIxLjU0IgogICAgIGZpbGw9IiNlMGVjZWMiCiAgICAgaWQ9ImNpcmNsZTE4IiAvPgogIDxsaW5lCiAgICAgeTE9IjIwLjgwNjc5MSIKICAgICB4Mj0iMzcuNzI0MTI5IgogICAgIHkyPSIxNy44Mzg5NjMiCiAgICAgc3Ryb2tlPSIjZTBlY2VjIgogICAgIGlkPSJsaW5lMjAiCiAgICAgeDE9IjMwLjY4ODc1NyIKICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuOTk4MzE2IiAvPgogIDxsaW5lCiAgICAgeTE9IjIwLjQ4NzYyMyIKICAgICB4Mj0iMzcuMjE1NDkyIgogICAgIHkyPSIyMy43NTQ0OCIKICAgICBzdHJva2U9IiNlMGVjZWMiCiAgICAgaWQ9ImxpbmUyMiIKICAgICB4MT0iMzAuMjg3Nzk2IgogICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MC45OTg0ODMiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczI5Ij4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9InBhaW50MF9saW5lYXJfMzI0XzQ5IgogICAgICAgeDE9IjI0IgogICAgICAgeTE9IjgiCiAgICAgICB4Mj0iMjQiCiAgICAgICB5Mj0iNTQiCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0b3AtY29sb3I9IiMyOTY5NkYiCiAgICAgICAgIGlkPSJzdG9wMjQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iIzE4M0Y0MiIKICAgICAgICAgaWQ9InN0b3AyNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgo8L3N2Zz4K';
    constructor(private _dialogHandler: DialogHandlerService) {}

    openModal() {
        this._dialogHandler.configure({ width: '513px' }).open(ModalCobrowsingComponent);
    }
}
