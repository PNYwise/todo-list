module.exports = {
  apps: [{
    name: 's',
    script: './build/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env:{
      NODE_ENV:"production",
      PORT: 3030
    }
  }],
};
