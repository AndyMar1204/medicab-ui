import { Adresse } from "./adresse";
import { Position } from "./position";

export class Account {
    id!: number;
    username!: string;
    number!: string;
    email!: string;
    password!: string;
    adresse = new Adresse();
    position = new Position();
    dateCreated = new Date();
    infos !:string;
}
