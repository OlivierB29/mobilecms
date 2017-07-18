
// TODO create a module for shared classes and utilities

import { NgModule, ModuleWithProviders } from '@angular/core';


// Do not specify providers for modules that might be imported by a lazy loaded module.


@NgModule()
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
