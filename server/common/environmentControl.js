const isProd = () => {
    return process.env.NODE_ENV === 'production';
};

const isDev = () => {
    return process.env.NODE_ENV === 'development';
};

const isTest = () => {
    return process.env.NODE_ENV === 'test';
};

module.exports = {
    isProd,
    isDev,
    isTest
};
