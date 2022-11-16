import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  console.log('🚀 ~ file: env.helper.ts ~ line 6 ~ getEnvPath ~ env', env);
  const fallback: string = resolve(`${dest}/.env`);
  console.log(
    '🚀 ~ file: env.helper.ts ~ line 8 ~ getEnvPath ~ fallback',
    fallback,
  );
  const filename: string = env ? `${env}.env` : '.env';
  console.log(
    '🚀 ~ file: env.helper.ts ~ line 10 ~ getEnvPath ~ filename',
    filename,
  );
  let filePath: string = resolve(`${dest}/${filename}`);
  console.log(
    '🚀 ~ file: env.helper.ts ~ line 12 ~ getEnvPath ~ filePath',
    filePath,
  );

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}
