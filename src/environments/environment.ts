// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  MAP_KEY: 'AIzaSyDuL6GMaEYhg685LMPHFKpFF_qaqFajm_g',
  mapbox: {
    accessToken: 'pk.eyJ1IjoicHJhYmluc2FoYW5pIiwiYSI6ImNsNHR3c25kczFoemUza3MyeW1wbWN2ZnoifQ.4JqFQBFv-ZovyTQ2GVjUkw'
  },
  apiUrl: 'http://localhost:3001/api',
  khalti_return_url: "http://localhost:4200/passenger/payment-verified/",
  khalti_website_url: "http://localhost:4200",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
