import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient ,HttpClientModule,HttpBackend} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Network } from '@ionic-native/network/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { GenericFormComponent } from './core/components/generic-form/generic-form.component';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent,UpdateProfileComponent,GenericFormComponent],
  entryComponents: [UpdateProfileComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule,AppRoutingModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
    Camera,
    FilePath,
    Chooser,
    PhotoViewer,
    File],
  bootstrap: [AppComponent],
})
export class AppModule {}
