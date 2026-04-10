export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}


export interface Role
{
    id: string;
    name: string;
    description: string;
    type?: string;
}
