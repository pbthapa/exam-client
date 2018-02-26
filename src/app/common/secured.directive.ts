import { Input, Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { element } from 'protractor';

import { KeycloakService } from './../keycloak/keycloak.service';

@Directive({
  selector: '[roles]',
  inputs: ['roles']
})
export class SecuredDirective {
    constructor(private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private keycloak: KeycloakService) {
    }

    @Input() set roles(menuRoles: Array<string>) {
        let shouldShow: boolean = false;
        let userRoles:Array<string> = this.keycloak.getUserRoles();
        for(let role of userRoles){
          // if(role.toUpperCase() == 'EXAM_ADMIN'){
          //   shouldShow = true;
          //   break;
          // }
          for(let menuRole of menuRoles){
            if(menuRole.toUpperCase() == role.toUpperCase()){
              shouldShow = true;
              break;
            }
          }
        }
        if (shouldShow) {
          this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
          this._viewContainer.clear();
        }
    }
}