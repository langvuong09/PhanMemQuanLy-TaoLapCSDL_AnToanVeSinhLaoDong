import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDoetDto } from './create-doet.dto';

export class UpdateDoetDto extends PartialType(OmitType(CreateDoetDto, ['taxCode'] as const)) {}