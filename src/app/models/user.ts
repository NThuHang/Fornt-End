import { Role } from "./role";
export class User {
    id: string;
    username: string;
    email : string ;
    tenquyen: Role;
    token?: string;
}
