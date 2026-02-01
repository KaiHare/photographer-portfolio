import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;
const endpoint = process.env.S3_ENDPOINT;

if (!bucket || !region) {
  console.warn("S3_REGION and S3_BUCKET must be set for upload routes.");
}

export const s3 = new S3Client({
  region,
  endpoint,
});

export function publicUrlForKey(key: string) {
  const prefix = process.env.S3_PUBLIC_URL_PREFIX;
  if (prefix) return `${prefix}/${key}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function putObject(key: string, body: Buffer, contentType: string) {
  if (!bucket) throw new Error("S3_BUCKET not configured");
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ACL: "public-read",
    })
  );
  return publicUrlForKey(key);
}
