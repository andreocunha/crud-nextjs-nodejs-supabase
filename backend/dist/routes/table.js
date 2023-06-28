"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tableController = __importStar(require("../controllers/tableController"));
const router = (0, express_1.Router)();
router.route('/login')
    .post(tableController.loginUser);
router.route('/:table')
    .get(tableController.getData)
    .post(tableController.postData)
    .put(tableController.putData);
router.route('/:table/:id')
    .get(tableController.getDataById)
    .delete(tableController.deleteData);
router.route('/:table/:field/:value')
    .get(tableController.getDataByField);
router.route('/').get((req, res) => {
    res.status(200).json({ message: 'API em execução' });
});
exports.default = router;
