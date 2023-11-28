

export type NavItem = INavItem;
export type NavItems = NavItem[];

export const navItemsComparer = ({order: orderA = 0}: INavItem, {order: orderB = 0}: INavItem ): number => {
    if( orderA < orderB ) return -1;
    if( orderA > orderB ) return 1;
    return 0;
}

export enum sidenavPrimaryStates {
    // default ridotto per schermi inferiori
    DEFAULT = '',
    OPENED = 'is-open'
}

export enum sidenavSecondaryStates {
    // default chiuso
    DEFAULT = '',
    OPENED = 'is-open',
}

export const sidenavPrimaryStatesMachine = {
    initial: 'DEFAULT',
    state: null,
    transitions: {
        'DEFAULT': {
            open: function(){ this.state = 'OPENED'; },
            close: function(){ this.state = 'DEFAULT'; },
        },
        'OPENED': {
            open: function(){ this.state = 'OPENED' },
            close: function(){ this.state = 'DEFAULT' }
        }
    },
    getState: function(){ return this.state },
    dispatch: function( transitionActionName: 'open' | 'close' ) {
        const state = this.state || this.initial;
        const action = this.transitions[state] && this.transitions[state][transitionActionName];

        if( !!action ) action.call(this);

        return this.state;
    }
}

export const sidenavSecondaryStatesMachine = {
    initial: 'DEFAULT',
    state: null,
    transitions: {
        'DEFAULT': {
            open: function(){ this.state = 'OPENED'; },
            close: function(){ this.state = 'DEFAULT'; },
        },
        'OPENED': {
            open: function(){ this.state = 'OPENED' },
            close: function(){ this.state = 'DEFAULT' }
        }
    },
    dispatch: function( transitionActionName: 'open' | 'close' ) {
        const state = this.state || this.initial;
        const action = this.transitions[state] && this.transitions[state][transitionActionName];

        if( !!action ) action.call(this);

        return this.state;
    }
}

export const NAV_ICON_MAPPER = {
    HOME: 'ic-home',
    TEST: 'ic-info2-out'
}

interface INavItem {
    id: number,
    url: string,
    /** url per l'apertura della sidenav secondaria */
    sidebarUrl?: string,
    icon: string,
    label: string,
    order: number,
    description?: string,
    disable?: boolean,
    disableDescription?: string,
}
