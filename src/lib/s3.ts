import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";
import path from "node:path";

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

/**
 * Build a stable key: projects/{projectId}/{photoId}/{variant}.{ext}
 */
export function buildObjectKey(projectId: string, photoId: string, variant: string, filename?: string) {
  const ext = filename ? path.extname(filename).replace(".", "").toLowerCase() || "jpg" : "jpg";
  return `projects/${projectId}/${photoId}/${variant}.${ext}`;
}

export async function putObject(key: string, body: Buffer, contentType: string) {
  if (!bucket) throw new Error("S3_BUCKET not configured");
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
    );
    return key;
  } catch (err: any) {
    throw new Error(`Failed to upload ${key}: ${err.message ?? "unknown error"}`);
  }
}

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export async function signObjectUrl(keyOrUrl: string | null | undefined, expiresInSeconds = 900) {
  if (!keyOrUrl) return keyOrUrl ?? undefined;
  if (isHttpUrl(keyOrUrl)) return keyOrUrl;
  if (!bucket) throw new Error("S3_BUCKET not configured");
  const command = new GetObjectCommand({ Bucket: bucket, Key: keyOrUrl });
  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

export async function hydratePhotoUrls<T extends { src?: string | null; thumbSrc?: string | null }>(
  photo: T,
  expiresInSeconds = 900
) {
  return {
    ...photo,
    src: await signObjectUrl(photo.src ?? undefined, expiresInSeconds),
    thumbSrc: await signObjectUrl(photo.thumbSrc ?? undefined, expiresInSeconds),
  };
}

export async function hydrateProjectUrls<T extends { coverSrc?: string | null; photos?: any[] }>(
  project: T,
  opts: { withPhotos?: boolean; expiresInSeconds?: number } = {}
) {
  const expiresInSeconds = opts.expiresInSeconds ?? 900;
  const hydratedCover = await signObjectUrl(project.coverSrc ?? undefined, expiresInSeconds);
  let photos = project.photos;
  if (opts.withPhotos && Array.isArray(project.photos)) {
    photos = await Promise.all(project.photos.map((p) => hydratePhotoUrls(p, expiresInSeconds)));
  }
  return {
    ...project,
    coverSrc: hydratedCover ?? project.coverSrc,
    photos,
  };
}

export function randomId() {
  return crypto.randomUUID();
}
