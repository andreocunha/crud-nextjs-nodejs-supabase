"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIpAddresses = void 0;
const os_1 = __importDefault(require("os"));
function getLocalIpAddresses() {
    const networkInterfaces = os_1.default.networkInterfaces();
    const ipAddresses = [];
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        if (!addresses)
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
exports.getLocalIpAddresses = getLocalIpAddresses;
