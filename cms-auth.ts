export type CmsAuthConfig = {
  adminUser: string;
  adminPassword: string;
  sessionSecret: string;
};

export const getCmsAuthConfig = (
  env: NodeJS.ProcessEnv = process.env
): CmsAuthConfig => ({
  adminUser: env.CMS_ADMIN_USER?.trim() || "",
  adminPassword: env.CMS_ADMIN_PASSWORD || "",
  sessionSecret: env.CMS_SESSION_SECRET?.trim() || "",
});

export const assertCmsAuthConfigured = (config: CmsAuthConfig) => {
  if (!config.adminUser || !config.adminPassword || !config.sessionSecret) {
    throw new Error(
      "CMS не налаштовано. Додайте CMS_ADMIN_USER, CMS_ADMIN_PASSWORD і CMS_SESSION_SECRET до .env.local"
    );
  }
};

export const validateCmsLogin = (
  username: string,
  password: string,
  config: CmsAuthConfig
) => username === config.adminUser && password === config.adminPassword;

export const getCmsSessionToken = (config: CmsAuthConfig) =>
  config.sessionSecret;
