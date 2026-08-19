import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import storageConfig from './config/storage.config';
import { validateEnvironment } from './config/env.validation';
import { DrizzleModule } from './database/drizzle.module';
import { AdminsModule } from './modules/admins/admins.module';
import { AuthModule } from './modules/auth/auth.module';
import { CmsModule } from './modules/cms/cms.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { SettingsModule } from './modules/settings/settings.module';
import { MediaModule } from './modules/media/media.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ContactModule } from './modules/contact/contact.module';
import { EngagementModule } from './modules/engagement/engagement.module';
import paymentConfig from './config/payment.config';
import { DonationsModule } from './modules/donations/donations.module';
import { EventsModule } from './modules/events/events.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { SecurityHeadersMiddleware } from './common/middleware/security-headers.middleware';
import runtimeConfig from './config/runtime.config';
import mailConfig from './config/mail.config';
import cacheConfig from './config/cache.config';
import { MailModule } from './modules/mail/mail.module';
import { CacheModule } from './modules/cache/cache.module';
import { BlogModule } from './modules/blog/blog.module';
import { FaqModule } from './modules/faq/faq.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { SeoModule } from './modules/seo/seo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      expandVariables: true,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        storageConfig,
        paymentConfig,
        runtimeConfig,
        mailConfig,
        cacheConfig,
      ],
      validate: validateEnvironment,
    }),
    DrizzleModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow<number>('app.rateLimitTtlMs'),
          limit: config.getOrThrow<number>('app.rateLimitRequests'),
        },
      ],
    }),
    AuthModule,
    AdminsModule,
    CmsModule,
    NavigationModule,
    SettingsModule,
    MediaModule,
    ContactModule,
    EngagementModule,
    DonationsModule,
    EventsModule,
    GalleryModule,
    MailModule,
    CacheModule,
    BlogModule,
    FaqModule,
    ResourcesModule,
    SeoModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SecurityHeadersMiddleware).forRoutes('*');
  }
}
