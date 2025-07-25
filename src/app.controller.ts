import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  getHomePage(@Res() res: Response): void {
    try {
      const htmlPath = join(process.cwd(), 'public', 'index.html');
      const htmlContent = readFileSync(htmlPath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      res.status(500).send('Error loading page');
    }
  }
}
