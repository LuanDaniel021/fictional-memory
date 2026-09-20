
import { Crlv } from "../../crlvs/entities/crlv.entity";
import { Template } from "../../templates/entities/template.entity";

export class Veiculo {
  id       : string;
  crlv     : Crlv;
  status   : string;
  template : Template;
}
