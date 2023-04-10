import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CourseService } from './app.service';
import Courses from './courses.json';

@Controller()
export class AppController {}
