import { IsNotEmpty, IsString, IsInt, IsArray, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReportDetailDto {
  @IsOptional() @IsInt() traumaId?: number;
  @IsOptional() @IsInt() injuryTypeId?: number;

  @IsOptional() @IsInt() totalCases?: number;
  @IsOptional() @IsInt() fatalCases?: number;
  @IsOptional() @IsInt() multiVictimCases?: number;
  @IsOptional() @IsInt() totalVictims?: number;
  @IsOptional() @IsInt() femaleVictims?: number;
  @IsOptional() @IsInt() fatalVictims?: number;
  @IsOptional() @IsInt() severeInjuries?: number;

  @IsOptional() @IsInt() nonManagedVictims?: number;
  @IsOptional() @IsInt() nonManagedFemaleVictims?: number;
  @IsOptional() @IsInt() nonManagedFatalVictims?: number;
  @IsOptional() @IsInt() nonManagedSevereInjuries?: number;

  @IsOptional() @IsNumber() medicalCost?: number;
  @IsOptional() @IsNumber() salaryCompensation?: number;
  @IsOptional() @IsNumber() propertyDamage?: number;
}

export class CreateReportDto {
  @IsNotEmpty() @IsString() title!: string;
  @IsNotEmpty() @IsInt() year!: number;
  @IsNotEmpty() @IsInt() reportTypeId!: number;
  
  @IsNotEmpty() @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReportDetailDto)
  details!: ReportDetailDto[];

  @IsOptional() @IsArray() @IsString({ each: true })
  fileIds?: string[];
}