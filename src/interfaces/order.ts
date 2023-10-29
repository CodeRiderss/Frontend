export interface Order {
    startDate:   string;
    endDate:     string;
    user:        OrderUser;
    offer:       Offer;
    id:          number;
    priceInEuro: string;
}

export interface Offer {
    startDate:          string;
    endDate:            string;
    longitude:          number;
    latitude:           number;
    active:             boolean;
    car:                Car;
    user:               OfferUser;
    pricePerHourInCent: number;
    id:                 number;
}

export interface Car {
    model:     string;
    buildYear: number;
    imageUrl:  string;
    id:        number;
}

export interface OfferUser {
    name:          string;
    description:   string;
    birthday:      string;
    experience:    string;
    telephone:     string;
    email:         string;
    profileUrl:    null | string;
    ratings:       Rating[];
    id:            number;
    averageRating: number;
}

export interface Rating {
    rating:      number;
    description: string;
    id:          number;
}

export interface OrderUser {
    name:          string;
    description:   string;
    birthday:      string;
    experience:    string;
    telephone:     string;
    email:         string;
    profileUrl:    null;
    ratings:       any[];
    id:            number;
    averageRating: string;
}
