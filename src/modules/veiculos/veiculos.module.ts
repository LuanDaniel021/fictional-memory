import { Module } from "@nestjs/common";
import { VeiculosController } from "./veiculos.controller";
import { VeiculosService } from "./veiculos.service";
import { SupabaseModule } from "../../supabase/supabase.module";
import { CrlvsModule } from "../crlvs/crlvs.module";
import { TemplatesModule } from "../templates/templates.module";
import { SupabaseAuthModule } from "../../supabase/supabase.auth.module";

@Module({
    imports: [
        SupabaseModule,
        SupabaseAuthModule,
        CrlvsModule,
        TemplatesModule
    ],
    controllers: [VeiculosController],
    providers: [VeiculosService],
    exports: [VeiculosService]
})
export class VeiculosModule {}