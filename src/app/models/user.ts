import { Account } from "./account";
import { Hopital } from "./hopital";

export class User extends Account{
    public postnom!: string;
    public sexe!: string;
    public alergies!: string;
    public groupeSanguin!: string;
    public donneurOrganes!: Boolean;
    public hopital!:Hopital
}
