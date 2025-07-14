export const log = (message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, message, data };
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('logs', JSON.stringify(logs));
};