export interface Clinic {
    id: number,
    name: string,
    description: string,
    address: string,
    sp_package: [{
        id: number
    }],
    doctor: [{
        id: number
    }]
}
