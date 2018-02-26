import { SecuredDirective } from './secured.directive';
import { NgModule } from '@angular/core';
import { BlueColorDirective } from './blue-color.directive';

@NgModule({
  imports: [],
  declarations: [
    BlueColorDirective,
    SecuredDirective
  ],
  exports: [
    BlueColorDirective,
    SecuredDirective
  ]
})
export class SharedModule { }
