import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   session({
  //     secret: 'UCWMakQmFszIUmKa1LnOFHrTqqJu6Bcp',
  //     resave: false,
  //     saveUnitialized: false,
  //     cookie: {
  //       maxAge: 600000,
  //     },
  //   }),
  // );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
