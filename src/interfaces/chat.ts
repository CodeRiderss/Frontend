import { User } from "./user";

export interface Chat {
    id:          number;
    text:        string;
    from:        User;
    to:          User;
}