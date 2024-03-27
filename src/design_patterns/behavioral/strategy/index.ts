// index.ts

// Importe as estratégias de autenticação
import { EmailAuthenticationStrategy } from "./strategies/email/email.strategy";
import { TokenVerificationStrategy } from "./strategies/email/email.strategy"

// Exporte as estratégias
export { EmailAuthenticationStrategy, TokenVerificationStrategy };
