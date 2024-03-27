"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenVerificationStrategy = exports.EmailAuthenticationStrategy = void 0;
// Importe as estratégias de autenticação
const email_strategy_1 = require("./strategies/email/email.strategy");
Object.defineProperty(exports, "EmailAuthenticationStrategy", { enumerable: true, get: function () { return email_strategy_1.EmailAuthenticationStrategy; } });
const email_strategy_2 = require("./strategies/email/email.strategy");
Object.defineProperty(exports, "TokenVerificationStrategy", { enumerable: true, get: function () { return email_strategy_2.TokenVerificationStrategy; } });
