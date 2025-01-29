import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { writeFileSync } from 'fs';

@Public()
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets',
        filename: (req, file, callback) => {
          const dateAndRandomNumber =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${dateAndRandomNumber}-${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCatDto: CreateCatDto,
  ) {
    if (!file) {
      throw new BadRequestException('Aucune image envoyée');
    }

    const imageUrl = `/assets/${file.filename}`; // Chemin relatif
    createCatDto.imageUrl = imageUrl;
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }

  @Get(':id/export')
  async exportCat(@Param('id') id: string, @Res() res: Response) {}
}
