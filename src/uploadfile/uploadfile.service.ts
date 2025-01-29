import { Injectable } from '@nestjs/common';
import { CreateUploadfileDto } from './dto/create-uploadfile.dto';
import { UpdateUploadfileDto } from './dto/update-uploadfile.dto';

@Injectable()
export class UploadfileService {
  create(createUploadfileDto: CreateUploadfileDto) {
    return 'This action adds a new uploadfile';
  }

  findAll() {
    return `This action returns all uploadfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadfile`;
  }

  update(id: number, updateUploadfileDto: UpdateUploadfileDto) {
    return `This action updates a #${id} uploadfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadfile`;
  }
}
