module.exports = {
  apps: [{
    name: 'server',
    script: './build/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: "production",
      PORT: 3030
    }
  }],
};
