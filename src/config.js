import configJson from "./auth_config.json";

export function getConfig() {
  const audience =
    configJson.audience && configJson.audience !== "YOUR_API_IDENTIFIER"
      ? configJson.audience
      : null;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    apiOrigin: configJson.apiOrigin,
    ...(audience ? { audience } : null),
  };
}
