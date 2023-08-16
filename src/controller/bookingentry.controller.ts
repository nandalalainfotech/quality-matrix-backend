import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { BookingentryDTO } from "src/dto/Bookingentry.dto";
import { Bookingentry001mb } from "src/entity/Bookingentry001mb";
import { BookingentryService } from "src/service/bookingentry.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from "@nestjs/swagger";
var path = require('path');
const fs = require('fs');

@ApiBearerAuth()
@Controller('/testandreportstudio/api/bookingentry')
export class BookingentryController {
    constructor(private readonly bookingentryService: BookingentryService) { }


    @UseGuards(JwtAuthGuard)
    @Post("save")
    create(@Body() bookingentryDTO: BookingentryDTO): Promise<Bookingentry001mb> {
        // console.log("bookingentryDTO----------------", bookingentryDTO);
        return this.bookingentryService.create(bookingentryDTO);
    }

    @Get('getCount')
    getCount(): Promise<string> {
        return this.bookingentryService.getCount();
    }

    @UseGuards(JwtAuthGuard)
    @Put("update")
    update(@Body() bookingentryDTO: BookingentryDTO): Promise<Bookingentry001mb> {
        // console.log("bookingentryDTO---->>", bookingentryDTO);

        return this.bookingentryService.update(bookingentryDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findAll/:username')
    findAll(@Param('username') username: any): Promise<BookingentryDTO[]> {
        return this.bookingentryService.findAll(username);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<BookingentryDTO> {
        return this.bookingentryService.findOne(id);
    }
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.bookingentryService.remove(id);
    }
}