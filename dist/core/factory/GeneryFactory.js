"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericFactory = void 0;
class GenericFactory {
    static createInstance(constructor, ...args) {
        return new constructor(...args);
    }
}
exports.GenericFactory = GenericFactory;
