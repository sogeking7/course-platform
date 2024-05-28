import { FilesInterceptor } from '@nestjs/platform-express';
import { extname, basename } from 'path';
import { diskStorage } from 'multer';

export const fileIntercepting = (destination: string) => {
  return FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination,
      filename: (req: any, file: any, cb: any) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(
          null,
          `${
            basename(file.originalname, extname(file.originalname)) +
            '-' +
            randomName
          }${extname(file.originalname)}`,
        );
      },
    }),
  });
};
