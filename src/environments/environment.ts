// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  AUTH_API: "https://freefood-api.herokuapp.com/",
  USER_CONTROLLER: "user",
  RESTAURANT_CONTROLLER: "restaurant",
  MENU_CONTROLLER: "menu",
  ADDRESS_CONTROLLER: "address",
  REQUEST_CONTROLLER: "request",
  
  REDIRECT_DASHBOARD: "/dashboard",
  REDIRECT_DASHBOARD_TWO: "/dashboardAllMenu",
  REDIRECT_AUTHENTICATION: "/authentication",
  REDIRECT_RESTAURANT: "/restaurant",
  REDIRECT_MENU: "/menu",
  REDIRECT_RESQUEST: "/request",
  REDIRECT_USER_EDIT: "/profile-edit",
  REDIRECT_SHOPPING_CAR: "/shopping-car",

  IMAGE_DEFAULT: "../assets/img/avatar/no_have_image.jpg",

  LANGUAGE_OPTIONS: ['en', 'pt-br']
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
