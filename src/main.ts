import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import { fitnessOutline, mailOutline, checkmarkCircleOutline,trendingUpOutline, lockClosedOutline, homeOutline, home,barbell, logOut, speedometerOutline, hourglassOutline, trophyOutline, refreshCircleOutline } from 'ionicons/icons';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

addIcons({
  'fitness-outline': fitnessOutline,
  'mail-outline': mailOutline,
  'trending-up-outline': trendingUpOutline,
  'lock-closed-outline': lockClosedOutline,
  'barbell': barbell,
  'home' : home,
  'log-out-outline' : logOut,
  'speedometer-outline' : speedometerOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'hourglass-outline': hourglassOutline,
  'trophy-outline': trophyOutline,
  'refresh-circle-outline': refreshCircleOutline,

});
