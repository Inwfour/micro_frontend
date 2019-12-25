import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import AngularApp from './index.component.ts'
import { enableProdMode } from '@angular/core'
import { APP_BASE_HREF, CommonModule  } from "@angular/common"

enableProdMode()

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/angular/' }],
  declarations: [
    AngularApp
  ],
  bootstrap: [AngularApp]
})
export default class MainModule {
}
