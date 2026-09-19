import { Module } from "@nestjs/common";
import { VeiculosController } from "./veiculos.controller";
import { VeiculosService } from "./veiculos.service";
import { SupabaseModule } from "../../supabase/supabase.module";
import { PneusModule } from "../pneus/pneus.module";
import { CrlvsModule } from "../crlvs/crlvs.module";

@Module({
    imports: [SupabaseModule, CrlvsModule, PneusModule],
    controllers: [VeiculosController],
    providers: [VeiculosService],
})
export class VeiculosModule {}