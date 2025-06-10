import { S3 } from 'aws-sdk';
import { Body, ManagedUpload } from 'aws-sdk/clients/s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsS3Service {
  readonly s3: S3;
  protected bucket = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3 = new S3();
  }

  upload(file: Body, key: string): Promise<ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: this.bucket,
          Body: file,
          Key: key,
          ACL: 'public-read',
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}
