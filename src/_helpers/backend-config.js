import config from 'config';

export const backendConfig = {
  // -----
  // Single-user API
  // -----
  apiUrl: config.apiUrl,

  headers: {
    Accept: "application/ld+json",
    // todo: should be application/json!
    "Content-Type": "application/ld+json"
  },

  // Storage keys - include the application name in the keys
  keyToken: `${config.appName}_token`,
  keyRefreshToken: `${config.appName}_refresh_token`,
  keyRefreshLockToken: `${config.appName}_refresh_token_lock`,

  // User API services
  login: "/api/login",
  refreshToken: "/token/refresh",
  profile: "/api/me",

  logout: "/api/logout",
  sign_up: "/patients/sign_up",
  tou: "/me/accept_conditions",

  // API information and configuration
  apiVersion: "/api/version",
  apiInfo: "/api/info",

  // Messages
  dailyMessages: "/daily_message",

  // Patients list
  groups: "/groups",
  patients: "/patients",

  // Users - for the example only
  users: "/users",
  users_sign_up: "/users/sign_up",

  // Patients health events service
  phes: "/patient_health_events",

  // Other services
  freeActivities: "/free_activities",
  plannedActivities: "/planned_activities",
  activities: "/activities",
  activityValues: "/activity_values",

  values: "/api/values",

  // Send information
  activityAnswers: "/activity_answers",
  // Get former answers
  valueAnswers: "/value_answers",

  // Media information
  media: "/media/get",
  mediaAdd: "/media/add",

  // Allowed users roles
  allowedRoles: ["ROLE_USER"]
};

if (backendConfig.apiUrl === undefined) {
  console.warn(
    "No URI defined for the API! Define a valid configuration!"
  );
}
