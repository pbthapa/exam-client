export class TreeModel {
    id: number;
    nodeName: string;
    hideCheckBox?: boolean = false;
    enableCheckBox?: boolean = true;
    children?: TreeModel[];
    
    constructor(id: number, nodeName: string, hideCheckBox: boolean, 
        enableCheckBox: boolean, children: TreeModel[]) {
            this.id = id;
            this.nodeName = nodeName;
            this.hideCheckBox = hideCheckBox;
            this.enableCheckBox = enableCheckBox;
            this.children = children;
        }
}