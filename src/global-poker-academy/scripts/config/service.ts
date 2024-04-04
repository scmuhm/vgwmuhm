interface ConfigService {
  TENANT_GP: `pok-test` | `pok-prod`;
  MAR_PIPELINES_HOST: string;
}

const localConfig: ConfigService = {
  TENANT_GP: `pok-test`,
  MAR_PIPELINES_HOST: `http://pipelines.vgw.marketing.local`,
};

const devConfig: ConfigService = {
  TENANT_GP: `pok-test`,
  MAR_PIPELINES_HOST: `https://pipelines.dev.vgw.marketing`,
};

const prodConfig: ConfigService = {
  TENANT_GP: `pok-prod`,
  MAR_PIPELINES_HOST: `https://pipelines.vgw.marketing`,
};

export const ClientConfig = ((): ConfigService => {
  const getConfig = (): ConfigService => {
    const origin =
      typeof window !== `undefined` && window.location.origin
        ? window.location.origin
        : process.env.NEXT_PUBLIC_HOST_NAME;

    if (origin?.includes(`local`) || origin?.includes(`0.0.0.0`)) {
      return {
        ...localConfig,
      };
    } else if (
      origin?.includes(`dev`) ||
      origin?.includes(`ci.test`) ||
      origin?.includes(`qc.test`)
    ) {
      return {
        ...devConfig,
      };
    } else {
      return {
        ...prodConfig,
      };
    }
  };

  // Ensure the function is only executed client-side
  if (typeof window !== `undefined`) {
    window.addEventListener(`DOMContentLoaded`, () => {
      getConfig();
    });
  }

  return getConfig();
})();
