import { Module } from "@nestjs/common";
import { VeiculosController } from "./veiculos.controller";
import { VeiculosService } from "./veiculos.service";
import { SupabaseModule } from "../../supabase/supabase.module";
import { PneusModule } from "../pneus/pneus.module";
import { CrlvsModule } from "../crlvs/crlvs.module";
import { TemplatesModule } from "../templates/templates.module";

@Module({
    imports: [
        SupabaseModule,
        CrlvsModule,
        PneusModule,
        TemplatesModule
    ],
    controllers: [VeiculosController],
    providers: [VeiculosService],
})
export class VeiculosModule {}