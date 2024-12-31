export const API_ROUTES = {
  HEALTH_CHECK: '/health-check',
  AUTH: '/auth',
  ALIGNMENT: '/alignments',
  DOCS: '/docs',
};

export const TABLES = {
  ALIGNMENT: { name: 'alignments_table', index: 'alignmentId' },
  STEPS: { name: 'steps_table', index: 'stepId' },
  TELEMETRY: { name: 'telemetry_table', index: 'telemetryId' },
  USERS: { name: 'users_table', index: 'userId', secondIndex: 'email' },
  VEHICLES: { name: 'vehicles_table', index: 'vin' },
};

export const USER_ROLES = {
  TECH: 'technician',
  ADMIN: 'admin',
};

