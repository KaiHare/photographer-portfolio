import type { Album, AlbumDetail } from "./types";
import { getMockAlbum, getMockAlbums } from "./mock-data";

const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
const apiBaseUrl = rawApiBaseUrl && rawApiBaseUrl.length > 0 ? rawApiBaseUrl : null;
const isServer = typeof window === "undefined";

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) when calling ${url}`);
  }
  return (await response.json()) as T;
}

export async function listAlbums(): Promise<Album[]> {
  if (apiBaseUrl) {
    return fetchJson<Album[]>(`${normalizeBaseUrl(apiBaseUrl)}/albums`);
  }

  if (isServer) {
    return getMockAlbums();
  }

  return fetchJson<Album[]>("/mock/albums.json");
}

export async function getAlbum(slug: string): Promise<AlbumDetail | null> {
  if (apiBaseUrl) {
    return fetchJson<AlbumDetail>(`${normalizeBaseUrl(apiBaseUrl)}/albums/${slug}`);
  }

  if (isServer) {
    return getMockAlbum(slug);
  }

  return fetchJson<AlbumDetail>(`/mock/albums/${slug}.json`);
}
