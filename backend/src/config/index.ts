const toml = () => {
    var tomlInstall = require('toml-require').install();
    // parse toml main configuration file at ./config/default.toml
    return require('./server.toml');
};

export const config = toml();
