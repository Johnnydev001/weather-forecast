type LocationAddressType = {
    city: string;
    country: string;
    name: string;
 
}

export type LocationRequestType = {
    query: any;
}

export type LocationResponseType = {
    address: LocationAddressType;
    lat: string | number;
    lon: string | number;
}

