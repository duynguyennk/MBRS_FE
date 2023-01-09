import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AnimateDirective } from './animate.directive';

@NgModule({
    declarations: [
        AnimateDirective,
    ],
    exports: [
        AnimateDirective,
    ],

    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: []
})

export class DirectivesModule {
}
