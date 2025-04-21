const fs = require('fs');
const path = require('path');

const backupData = () => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const backupPath = path.join(__dirname, `../backups/backup-${timestamp}.json`);

  // Simulated data
  const mockData = {
    residents: [],
    payments: [],
    users: []
  };

  fs.writeFileSync(backupPath, JSON.stringify(mockData, null, 2));
  return backupPath;
};

module.exports = backupData;
