import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { diskStorage } from 'multer';

@Public()
@Controller('upload')
export class UploadfileController {
  constructor(private readonly uploadfileService: UploadfileService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'Fichier bien reçu !' };
  }
}
