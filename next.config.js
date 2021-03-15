const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');

console.log('!!!PHASES:', PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD);

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    // when `next build` or `npm run build` is used
    const isProd =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    // when `next build` or `npm run build` is used
    const isStaging =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

    const env = {
        RESTURL: (() => {
            if (isDev) return 'http://localhost:3000';
            if (isProd) {
                return 'https://kr-web.klishevich.ru';
            }
            if (isStaging) return 'http://localhost:3000';
            return 'RESTURL:not (isDev,isProd && !isStaging,isProd && isStaging)';
        })(),
        RESTURL_SESSIONS: (() => {
            if (isDev) return 'http://localhost:3000/sessions';
            if (isProd) return 'https://kr-web.klishevich.com/sessions';
            if (isStaging) return 'http://localhost:3000';
            return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)';
        })(),
    };

    // next.config.js object
    return {
        env,
    };
};
