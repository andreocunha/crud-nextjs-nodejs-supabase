import os from 'os';

export function getLocalIpAddresses(): string {
  const networkInterfaces = os.networkInterfaces();
  const ipAddresses = [];

  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];

    if(!addresses)
      continue;
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        ipAddresses.push(address.address);
      }
    }
  }

  const ipAddress = ipAddresses[0] || 'localhost';
  return ipAddress;
}