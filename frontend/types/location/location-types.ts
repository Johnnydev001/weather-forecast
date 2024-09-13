type LocationAddressType = {
    city: string;
    country: string;
}

export type LocationRequestType = {
    lat: string | number;
    lon: string | number;
}



export type LocationResponseType = {
    address: LocationAddressType;
}

