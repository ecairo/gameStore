import { Guid } from "../common/Guid"

export interface User{
    Id: Guid
    FirstName: string
    LastName: string
    UserName: string
}