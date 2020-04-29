export interface SPPackage {
    id: number,
    name: string,
    service_provider: {
        id: number
    },
    clinics: [{
        id: number
    }]
}
