import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SystempropertiesDTO } from '../dto/Systemproperties.dto';
import { Systemproperties001mb } from '../entity/Systemproperties001mb';
import { SystemPropertiesService } from '../service/system-properties.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('/testandreportstudio/api/systemproperties')
export class SystemPropertiesController {
	constructor(private readonly systemPropertiesService: SystemPropertiesService) { }

	// @UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() systempropertiesDTO: SystempropertiesDTO): Promise<Systemproperties001mb> {
		return this.systemPropertiesService.create(systempropertiesDTO);
	}

	// @UseGuards(JwtAuthGuard)
	@Get('getSystemPropertiesByNameAndType/:name/:type')
	getSystemPropertiesByNameAndType(@Param('name') name: string, @Param('type') type: string): Promise<Systemproperties001mb[]> {
		return this.systemPropertiesService.getSystemPropertiesByNameAndType(name, type);
	}

	// @UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<Systemproperties001mb[]> {
		return this.systemPropertiesService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string): Promise<Systemproperties001mb> {
		return this.systemPropertiesService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.systemPropertiesService.remove(id);
	}
}
