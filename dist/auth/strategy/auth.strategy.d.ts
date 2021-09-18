import { Strategy } from "passport-jwt";
declare const AuthStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthStrategy extends AuthStrategy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
