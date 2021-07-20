export const adClientID = process.env.AD_CLIENT_ID;

const enableAds = (): boolean => window.location.hostname.includes('partiguiden.') && !!adClientID;

export default enableAds;
