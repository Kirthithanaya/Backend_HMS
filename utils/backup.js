import fs from 'fs';
import path from "path"
export const backupData = () => {
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

