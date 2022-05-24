import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {HomeComponent} from './home/home.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {IndexComponent} from "./Pages/index/index.component";
import {UserComponent} from './Pages/user/user.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTableModule} from "ng-zorro-antd/table";
import {LoginComponent} from './login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {RegisterComponent} from './register/register.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {MyInterceptor} from "./myinterceptor";
import {UserFormComponent} from './Pages/user/user-form/user-form.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {PersonComponent} from './Pages/person/person.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzModalModule} from "ng-zorro-antd/modal";
import {ComputeComponent} from "./Pages/compute/compute.component";
import {NzMessageService} from "ng-zorro-antd/message";

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        IndexComponent,
        UserComponent,
        LoginComponent,
        RegisterComponent,
        UserFormComponent,
        PersonComponent,
        ComputeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzButtonModule,
        NzDividerModule,
        NzTableModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzCheckboxModule,
        NzSelectModule,
        NzTypographyModule,
        NzPageHeaderModule,
        NzCardModule,
        NzModalModule,
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}, {
        provide: HTTP_INTERCEPTORS,
        useClass: MyInterceptor,
        multi: true
    }, {provide: NzNotificationService},{provide: NzMessageService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
