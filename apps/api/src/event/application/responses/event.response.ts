type DateTime = string;

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Address {
    city: string;
    place: string;
    coordinates?: Coordinates;
}


export interface EventResponse {
    id:             string;
    title:          string;
    subtitle:       string;
    description:    string;
    from:           DateTime;
    to:             DateTime;
    address:        Address;
    createdAt:      DateTime;
    links:          string[];
    tags:           string[];
    primaryColor:   string;
    coverImage?:    string;
    userId:         string;
}