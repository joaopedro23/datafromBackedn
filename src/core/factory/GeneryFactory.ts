export class GenericFactory {
    static createInstance<T>(constructor: new (...args: any[]) => T, ...args: any[]): T {
        return new constructor(...args);
    }
}
