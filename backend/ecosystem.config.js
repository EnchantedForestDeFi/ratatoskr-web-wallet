module.exports = {
  apps: [{
    name: 'ratr-wallet-api',
    script: 'dist/index.js',
    cwd: '/opt/ratatoskr-web-wallet/backend',
    interpreter: 'node',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '15s',
    restart_delay: 3000,
    error_file: '/opt/ratatoskr-web-wallet/backend/logs/api-error.log',
    out_file: '/opt/ratatoskr-web-wallet/backend/logs/api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '256M',
    env: { NODE_ENV: 'production' },
  }],
};
