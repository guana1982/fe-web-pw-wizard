export class Radio<T = any> {
    public label: string;
    public icon?: string;
    public checked: boolean;
    public value: T;
    public size?: string;

    constructor(label: string, checked: boolean, value: any, icon: string = null, size: string) {
        this.label = label;
        this.icon = icon;
        this.checked = checked;
        this.value = value;
        this.size = size;
    }
}

export class RadioAmazon<T = any> {
    public label: string;
    public icon?: string;
    public checked: boolean;
    public bonus: number;
    public value: T;


    constructor(label: string, checked: boolean, value: any, icon: string = null, bonus: number = 0) {
        this.label = label;
        this.icon = icon;
        this.checked = checked;
        this.value = value;
        this.bonus = bonus;
    }
}

export class RadioPianiRateali<T = any> {
    public title: string | number;
    public label: string;
    public icon?: string;
    public checked: boolean;
    public value: T;

    constructor(label: string, checked: boolean, value: any, icon: string = null, title: string|number) {
        this.title = title;
        this.label = label;
        this.icon = icon;
        this.checked = checked;
        this.value = value;
    }
}
