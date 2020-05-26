import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenuComponent} from "./components/menu/menu.component";
import {HttpClientModule} from "@angular/common/http";
import {APP_INITIALIZER} from '@angular/core';
import {AppConfig} from "./services/AppConfig";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatButtonModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material";
import {SearchResult} from "./components/searchResult/SearchResult.component";
import {MatCardModule} from '@angular/material/card';
import {ShowMoreComponent} from './components/showMore/showMore.component';


export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.load();
}

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        SearchResult,
      ShowMoreComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatMenuModule, MatButtonModule,
        MatInputModule, MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule
    ],
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig], multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
