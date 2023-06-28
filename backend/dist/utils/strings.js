"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeparetedContentData = exports.getContentData = void 0;
const gpt_tokenizer_1 = require("gpt-tokenizer");
const natural_1 = __importDefault(require("natural"));
const MAX_TOKENS_EMDEDDING = 350;
const MIN_TOKENS_EMDEDDING = 30;
function getContentData(content) {
    try {
        if (!Array.isArray(content)) {
            throw new TypeError('A entrada deve ser um array de strings');
        }
        const tokenizer = new natural_1.default.SentenceTokenizer();
        const result = [];
        for (const line of content) {
            if (typeof line !== 'string') {
                throw new TypeError('Todos os elementos do array devem ser strings');
            }
            const lineTokenCount = (0, gpt_tokenizer_1.encode)(line).length;
            // Se a linha tiver menos de MAX_TOKENS_EMDEDDING tokens, simplesmente adicione-a ao resultado
            if (lineTokenCount <= MAX_TOKENS_EMDEDDING) {
                result.push(line);
                continue;
            }
            // Se a linha tiver mais de MAX_TOKENS_EMDEDDING tokens, divida-a em sentenças
            let tokenCount = 0;
            let currentContent = '';
            const sentences = tokenizer.tokenize(line);
            for (let i = 0; i < sentences.length; i++) {
                let sentence = sentences[i];
                let sentenceTokenCount = (0, gpt_tokenizer_1.encode)(sentence).length;
                // Se a sentença for maior que MAX_TOKENS_EMDEDDING tokens, divida-a ainda mais
                if (sentenceTokenCount > MAX_TOKENS_EMDEDDING) {
                    let subSentences = sentence.split(' ');
                    for (let subSentence of subSentences) {
                        let subSentenceTokenCount = (0, gpt_tokenizer_1.encode)(subSentence).length;
                        if (subSentenceTokenCount > MAX_TOKENS_EMDEDDING) {
                            // Split the sub-sentence into MAX_TOKENS_EMDEDDING-token chunks
                            while (subSentenceTokenCount > MAX_TOKENS_EMDEDDING) {
                                const chunk = subSentence.slice(0, MAX_TOKENS_EMDEDDING);
                                result.push(chunk);
                                subSentence = subSentence.slice(MAX_TOKENS_EMDEDDING);
                                subSentenceTokenCount = (0, gpt_tokenizer_1.encode)(subSentence).length;
                            }
                            currentContent = subSentence;
                            tokenCount = subSentenceTokenCount;
                        }
                        else if ((tokenCount + subSentenceTokenCount) > MAX_TOKENS_EMDEDDING) {
                            result.push(currentContent);
                            currentContent = subSentence;
                            tokenCount = subSentenceTokenCount;
                        }
                        else {
                            currentContent += ` ${subSentence}`;
                            tokenCount += subSentenceTokenCount;
                        }
                    }
                    // If adding the next sentence will exceed MAX_TOKENS_EMDEDDING tokens, save the current content as a separate item
                }
                else if ((tokenCount + sentenceTokenCount) > MAX_TOKENS_EMDEDDING) {
                    result.push(currentContent);
                    currentContent = sentence;
                    tokenCount = sentenceTokenCount;
                }
                else {
                    currentContent += ` ${sentence}`;
                    tokenCount += sentenceTokenCount;
                }
            }
            // Se houver algum conteúdo restante após a divisão, adicione-o ao resultado
            if (currentContent) {
                result.push(currentContent);
            }
        }
        // Check if last sentence is less than MIN_TOKENS_EMDEDDING tokens and concatenate with next one if possible
        for (let i = 0; i < result.length - 1; i++) {
            const currentSentence = result[i];
            const nextSentence = result[i + 1];
            const currentSentenceTokenCount = (0, gpt_tokenizer_1.encode)(currentSentence).length;
            const nextSentenceTokenCount = (0, gpt_tokenizer_1.encode)(nextSentence).length;
            if (currentSentenceTokenCount < MIN_TOKENS_EMDEDDING && (currentSentenceTokenCount + nextSentenceTokenCount <= MAX_TOKENS_EMDEDDING)) {
                result[i] = currentSentence + ' ' + nextSentence;
                result.splice(i + 1, 1); // Remove next sentence
                i--; // Check this index again
            }
        }
        return result;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
exports.getContentData = getContentData;
function getSeparetedContentData(content, maxTokens = 8000) {
    const simpleArrayContent = getContentData(content);
    const result = []; // array de arrays de conteúdo
    let currentContent = [];
    let currentTokenCount = 0;
    for (const line of simpleArrayContent) {
        const lineTokenCount = (0, gpt_tokenizer_1.encode)(line).length;
        if ((currentTokenCount + lineTokenCount) > maxTokens) {
            result.push(currentContent);
            currentContent = [line];
            currentTokenCount = lineTokenCount;
        }
        else {
            currentContent.push(line);
            currentTokenCount += lineTokenCount;
        }
    }
    if (currentContent.length) {
        result.push(currentContent);
    }
    return result;
}
exports.getSeparetedContentData = getSeparetedContentData;
