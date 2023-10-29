import { User } from "./user";

export interface MessageRequest {
    text:        string;
    from:        number;
    to:          number;
}