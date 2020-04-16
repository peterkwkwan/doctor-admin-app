export interface ServiceProvider {
    id: number,
    name: string,
    effective_date: string,
    expiry_date: string,
    clinic: [{
        id: number
    }]
}
