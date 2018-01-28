import { AppRoutingModule } from "./app-routing.module";
import { SharedModuleModule } from "./Shared/shared-module.module";
import { FeaturesModuleModule } from "./Features/features-module.module";
import { AuthModuleModule } from "./Core/Auth/auth-module.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpModule } from "@angular/http";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SelectModule } from "ng-select";
// import { NGXSimpleModalModule } from "ngx-simple-modal";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AuthModuleModule, // Singleton objects (services, components that are loaded only once, etc.)
    SharedModuleModule, // Shared (multi-instance) objects
    HttpModule,
    AppRoutingModule, // app rouring module
    SelectModule
    // NGXSimpleModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
