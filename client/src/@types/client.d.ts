export interface authObject {
    loggedIn: boolean,
    userId: string
}

export type AuthContextType =  {
    loggedIn: authObject,
    saveAuth: (id: string) => void
    handleLogout: () => void
}