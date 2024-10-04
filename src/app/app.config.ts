import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { spinnerInterceptor } from './core';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptors([spinnerInterceptor])),
		provideRouter(
			routes,
			withHashLocation(),
			withComponentInputBinding()
			// withPreloading(PreloadAllModules)
		)
	]
};
