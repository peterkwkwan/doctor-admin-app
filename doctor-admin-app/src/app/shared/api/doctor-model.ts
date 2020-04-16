export interface Doctor {
    id: number,
    firstName: string,
    lastName: string,
    status: string,
    gender: string,
    effective_date: string,
    expiry_date: string,
    email: string,
    phone: string,
    address: string,
    clinics: [{
        id: number
    }]
}
