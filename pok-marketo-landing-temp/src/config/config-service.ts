
interface ConfigService {
    MAR_PIPELINE_HOST: string;
}

const localConfig: ConfigService = {
    MAR_PIPELINE_HOST: `http://pipelines.vgw.marketing.local`,
};

const devConfig: ConfigService = {
    MAR_PIPELINE_HOST: `https://pipelines.dev.vgw.marketing`,
};

const prodConfig: ConfigService = {
    MAR_PIPELINE_HOST: `https://pipelines.vgw.marketing`,
};

export const ClientConfig = ((): ConfigService => {

    try {
        if (typeof window !== `undefined` && window.location.origin) {

            const origin = window.location.origin;

            if (origin?.includes(`local`) || origin?.includes(`0.0.0.0`)) {
                return {
                    ...localConfig,
                };
            } else if (origin?.includes(`dev`) || origin?.includes(`test`)) {
                return {
                    ...devConfig,
                };
            } else {
                return {
                    ...prodConfig,
                };
            }
        }
    } catch (e) {
        console.log(`Error configuring environment origin`, e)
    }

    return {
        ...localConfig,
    };
})();
