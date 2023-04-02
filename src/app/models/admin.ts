import { Account } from "./account";
import { TypeAdmin } from "./type-admin.enum";

export class Admin  extends Account{
    public type!: TypeAdmin;
}
