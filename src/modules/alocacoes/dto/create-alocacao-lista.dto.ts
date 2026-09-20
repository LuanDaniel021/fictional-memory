import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { CreateAlocacaoDto } from "./create-alocacao.dto";

export class CreateAlocacaoListaDto {

    @IsArray()
    @ArrayMinSize(2, {
        message: 'A lista deve conter pelo menos 2 itens'
    })
    @ValidateNested({ each: true })
    @Type(() => CreateAlocacaoDto)
    itens: CreateAlocacaoDto[];

}
