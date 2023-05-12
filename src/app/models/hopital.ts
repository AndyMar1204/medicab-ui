import { Account } from "./account";

export class Hopital  extends Account{
    public nom!: string;
    public heureOuverture!:Date
    public heureFermeture!:Date
    public isOpen!:boolean


}
