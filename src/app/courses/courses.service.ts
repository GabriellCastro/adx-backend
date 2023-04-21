import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll(page: number) {
    return this.prisma.courses.findMany({
      take: 8,
      skip: (page - 1) * 8,
    });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.prisma.courses.findUnique({
      where: { id },
    });
  }
}
