export interface ServiceProvider {
    id: number,
    name: string,
    effective_date: string,
    expiry_date: string,
    sp_package: [{
            id: number
    }]
}
