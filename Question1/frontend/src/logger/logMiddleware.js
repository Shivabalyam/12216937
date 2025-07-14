export const log = (message, data = null) => {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, data };

    // Safely parse existing logs
    const logs = JSON.parse(localStorage.getItem('logs')) || [];

    // Append the new log
    logs.push(logEntry);

    // Save back to localStorage
    localStorage.setItem('logs', JSON.stringify(logs));
  } catch (error) {
    // Fallback in case localStorage is full or corrupted
    alert('Logging failed. Please clear your browser storage.');
  }
};
