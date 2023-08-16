import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctormasterController } from "src/controller/doctormaster.controller";
import { Doctormaster001hb } from "src/entity/Doctormaster001hb";
import { Doctormaster001mb } from "src/entity/Doctormaster001mb";
import { User001mb } from "src/entity/User001mb";
import { DoctormasterService } from "src/service/doctormaster.service";



@Module({
    imports: [TypeOrmModule.forFeature([Doctormaster001mb, Doctormaster001hb, User001mb])],
    providers: [DoctormasterService],
    controllers: [DoctormasterController]
})

export class DoctormasterModule { }