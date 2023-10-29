export interface User {
    name:        string;
    password:    string;
    description: string;
    birthday:    string;
    experience:  string;
    telephone:   string;
    email:       string;
    ratings:     Rating[];
    id:          number;
    profileUrl?:  string;
}

export interface Rating {
    rating:      number;
    description: string;
    id:          number;
}
