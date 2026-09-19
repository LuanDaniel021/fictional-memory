import { Module } from "@nestjs/common";
import { SupabaseModule } from "../../../../supabase/supabase.module";
import { MedicoesController } from "./medicoes.controller";
import { MedicoesService } from "./medicoes.service";

@Module({
    imports: [SupabaseModule],
    controllers: [MedicoesController],
    providers: [MedicoesService]
})
export class MedicoesModule {}