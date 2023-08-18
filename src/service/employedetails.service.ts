import { Injectable } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeedetailsDTO } from 'src/dto/employeedetails.dto';
import { User001mb } from 'src/entity/User001mb';
import { Course001mb } from 'src/entity/course001mb';
import { Employeedetails001mb } from 'src/entity/employeedetails001mb';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
var pdf = require("pdf-creator-node");
const excel = require('exceljs');

@ApiBearerAuth()
@Injectable()
export class EmployeedetailsService {
    constructor(
        private mailService: MailService, @InjectRepository(Employeedetails001mb) private readonly employeeRepository: Repository<Employeedetails001mb>,
        @InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        @InjectRepository(Course001mb) private readonly courseRepository: Repository<Course001mb>) { }

    async create(employeedetailsDTO: EmployeedetailsDTO): Promise<Employeedetails001mb> {
        console.log("employeedetailsDTO-->", employeedetailsDTO);
        const employeedetails001mb = new Employeedetails001mb();
        employeedetails001mb.setProperties(employeedetailsDTO);
        const {
            v4: uuidv4,
        } = require('uuid');
        uuidv4();
        console.log("uuidv4()-------->", uuidv4());
        return this.employeeRepository.save(employeedetails001mb);
    }

    async update(employeedetailsDTO: EmployeedetailsDTO): Promise<Employeedetails001mb> {
        const employeedetails001mb = new Employeedetails001mb();
        employeedetails001mb.setProperties(employeedetailsDTO);
        await this.employeeRepository.update({ slNo: employeedetails001mb.slNo }, employeedetails001mb);
        return employeedetails001mb;
    }
    async findAll(): Promise<Employeedetails001mb[]> {
        let data: Employeedetails001mb[] | any;
        data = await this.employeeRepository.find({ relations: ['slNo2']
            });
        console.log("data--------->dfdf", data); 
       // await this.mailService.sendUserConfirmation1(data)
        return data;
    }

    findOne(id: number): Promise<Employeedetails001mb> {
        return this.employeeRepository.findOne(id);
    }
  
    async remove(id: string): Promise<void> {
        await this.employeeRepository.delete(id);
    }
}


