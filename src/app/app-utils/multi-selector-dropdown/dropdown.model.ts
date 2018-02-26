export class DropdownModel {
    private _id: number;
    private _label: string;
    private _checked: boolean;

    public constructor(id: number, label: string, checked: boolean) {
        this._id = id;
        this._label = label;
        this._checked = checked;
    }

    public get id(): number {
        return this._id;
    }
    
    public get label(): string {
        return this._label;
    }

    public get checked(): boolean {
        return this._checked;
    }

    toString(): string {
        return this._label;
    }
}