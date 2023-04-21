import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import AdminJs from 'adminjs';
import { DMMFClass } from '@prisma/client/runtime';

import { branding, auth, sessionOptions } from './config/adminjs';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { CoursesModule } from './app/courses/courses.module';

AdminJs.registerAdapter({ Database, Resource });

@Module({
  imports: [
    PrismaModule,
    AdminModule.createAdminAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: async (prisma: PrismaService) => {
        const dmmf = (prisma as any)._baseDmmf as DMMFClass;
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: dmmf.datamodel.models.map((model) => {
              return {
                resource: {
                  model: dmmf.modelMap[model.name],
                  client: prisma,
                },
                options: {
                  navigation: {
                    name: model.name,
                  },
                },
              };
            }),
            branding,
          },
          auth,
          sessionOptions,
        };
      },
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
