// src/config/adminPaths.ts
// Centralized security configuration for unpredictable admin access paths.
// You can change these slugs at any time to keep the portal entirely confidential.

export const ADMIN_SECURITY_PATHS = {
  // Secret path to reach the email/password authentication screen (formerly /login)
  LOGIN: '/gopalji-vault-gateway',

  // Secret path to reach the administrative dashboard (formerly /admin)
  DASHBOARD: '/gopalji-vault-control',
};
