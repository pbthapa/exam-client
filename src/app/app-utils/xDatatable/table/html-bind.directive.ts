import { Directive, HostListener, OnInit, Output, Input, EventEmitter, ElementRef, Renderer } from "@angular/core";
import { setTimeout } from "timers";

declare const $: any;

@Directive({
    selector: "[htmlbind]"
})
export class HtmlBind implements OnInit {
    @Input() col;
    @Input() row;

    @Output() fire: EventEmitter<any> = new EventEmitter();
    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        if (this.col && this.col.type == 'html') {
            this.elementRef.nativeElement.innerHTML = this.row[this.col.key];
            for (let i = 0; i < this.elementRef.nativeElement.children.length; i++) {
                let child = this.elementRef.nativeElement.children[i];
                this.renderer.listen(child, 'click', event => {
                    event.stopPropagation();
                    this.fire.emit({ event: event, col: this.col, row: this.row, value: event.target.attributes.value ? event.target.attributes.value.nodeValue : 'cannot find value attr' })
                })
            }
        }
        this.initTooltip();
    }

    private initTooltip() {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
        }, 0);
    }
}