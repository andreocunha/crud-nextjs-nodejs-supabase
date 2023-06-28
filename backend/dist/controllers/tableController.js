"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteData = exports.putData = exports.postData = exports.getDataByField = exports.getDataById = exports.getData = void 0;
const express_validator_1 = require("express-validator");
const initSupabase_1 = require("../lib/initSupabase");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
function getData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const table = req.params.table;
        try {
            const { data, error } = yield initSupabase_1.supabase.from(table).select();
            if (error)
                throw error;
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.getData = getData;
function getDataById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { table, id } = req.params;
        try {
            const { data, error } = yield initSupabase_1.supabase.from(table).select().eq('id', id);
            if (error)
                throw error;
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.getDataById = getDataById;
function getDataByField(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { table, field, value } = req.params;
        try {
            const { data, error } = yield initSupabase_1.supabase.from(table).select().eq(field, value);
            if (error)
                throw error;
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.getDataByField = getDataByField;
function postData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const table = req.params.table;
        const data = req.body;
        try {
            if (table == 'user') {
                try {
                    const { error } = yield initSupabase_1.supabase.from(table).insert([{
                            id: (0, uuid_1.v4)(),
                            name: data.name,
                            cpf: data.cpf,
                            email: data.email,
                            password: bcrypt_1.default.hashSync(data.password, 10),
                            image: data.image ? data.image : null,
                        }]);
                    if (error)
                        throw error;
                    res.status(200).json({ message: `Entrada criada na tabela ${table}` });
                }
                catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
            else {
                try {
                    const { error } = yield initSupabase_1.supabase.from(table).insert([data]);
                    if (error)
                        throw error;
                    res.status(200).json({ message: `Entrada criada na tabela ${table}` });
                }
                catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.postData = postData;
function putData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const table = req.params.table;
        const id = req.body.id;
        const data = req.body;
        try {
            if (data.password) {
                data.password = bcrypt_1.default.hashSync(data.password, 10);
            }
            const { error } = yield initSupabase_1.supabase.from(table).update(data).eq('id', id);
            if (error)
                throw error;
            res.status(200).json({ message: `Entrada atualizada na tabela ${table}` });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.putData = putData;
function deleteData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { table, id } = req.params;
        try {
            const { error } = yield initSupabase_1.supabase.from(table).delete().eq('id', id);
            if (error)
                throw error;
            res.status(200).json({ message: `Entrada excluída da tabela ${table}` });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.deleteData = deleteData;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const { data, error } = yield initSupabase_1.supabase.from('user').select('*').eq('email', email);
            if (error)
                throw error;
            if (!data || data.length === 0) {
                return res.status(401).json({ error: "Usuário não encontrado" });
            }
            const match = yield bcrypt_1.default.compare(password, data[0].password);
            if (!match) {
                return res.status(401).json({ user: null, error: "Os dados não conferem!" });
            }
            // Senha é válida, usuário está logado
            return res.status(200).json({
                user: data[0],
            });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
exports.loginUser = loginUser;
