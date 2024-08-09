import { provideFileRouter, requestContextInterceptor } from '@analogjs/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { type ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core'
import { provideClientHydration } from '@angular/platform-browser'
import { createGlobalClient } from '@defjs/core'
import { environment } from '@src/environments/environment'

createGlobalClient({
  host: environment.host,
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideFileRouter(),
    provideHttpClient(withInterceptors([requestContextInterceptor])),
    provideClientHydration(),
  ],
}
