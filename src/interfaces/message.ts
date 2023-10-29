import { User } from "./user";

export interface Message {
    id:          number;
    text:        string;
    from:        User;
    to:          User;
}