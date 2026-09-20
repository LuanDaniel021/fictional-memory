import { Entity } from "typeorm";
import { Crlv } from "../../../crlvs/entities/crlv.entity";
import { Template } from "../../../templates/entities/template.entity";

@Entity()
export class Veiculo {
  id       : string;
  crlv     : Crlv;
  status   : string;
  template : Template;
}