import { User } from "./user";

export interface Message {
    id:          number;
    text:        string;
    fromUserId:  number;
    toUserId:    number;
}