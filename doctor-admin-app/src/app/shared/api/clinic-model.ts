export interface Clinic {
    id: number,
    name: string,
    description: string,
    address: string,
    service_providers: [{
        id: number
    }],
    doctor: [{
        id: number
    }]
}
