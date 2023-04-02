import { Account } from "./account";

export class User extends Account{
    public postnom!: string;
    public sexe!: string;
    public alergies!: string;
    public groupeSanguin!: string;
    public donneurOrganes!: Boolean;
}
