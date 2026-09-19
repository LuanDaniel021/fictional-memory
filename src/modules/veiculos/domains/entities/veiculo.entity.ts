import { Entity } from "typeorm";

@Entity()
export class Veiculo {
  status   : string;
  template : string
}