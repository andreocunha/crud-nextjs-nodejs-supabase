"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
function validateInput(embed_data, chatbot_id, question, conversation) {
    // Validating embed_data
    if (embed_data && (!Array.isArray(embed_data) || !embed_data.every(item => {
        return typeof item === 'object' &&
            'title' in item && typeof (item.title === 'string' || item.link === null) &&
            'text' in item && typeof (item.text === 'string' || item.link === null) &&
            'link' in item && typeof (item.link === 'string' || item.link === null) &&
            'similarity' in item && typeof item.similarity === 'number';
    }))) {
        return { valid: false, message: 'embed_data, se fornecido, não está no formato correto.' };
    }
    // Validating chatbot_id
    if (typeof chatbot_id !== 'string') {
        return { valid: false, message: 'chatbot_id deve ser uma string.' };
    }
    // Validating question
    if (typeof question !== 'string' || question.length > 1000) {
        return { valid: false, message: 'Desculpa, a pergunta está muito longa. Pode fazer um menor?' };
    }
    // Validating conversation
    if (conversation && (!Array.isArray(conversation) || !conversation.every(item => {
        return typeof item === 'object' &&
            'role' in item && ['user', 'assistant'].includes(item.role) &&
            'content' in item && typeof item.content === 'string';
    }))) {
        return { valid: false, message: 'conversation, se fornecido, não está no formato correto.' };
    }
    return { valid: true, message: '' };
}
exports.validateInput = validateInput;
