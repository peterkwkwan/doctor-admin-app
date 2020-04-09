export interface Doctor {
    id: number,
    username: string,
    userRoles: [
        {
            role: string
        }
    ],
    userContacts: [
        {
            type: string,
            detail: string,
        }
    ]
}
