import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmbedUrl(url: string | undefined): string {
  if (!url) return '';
  const fileId = url.match(/\/d\/(.*?)\/view/)?.[1];
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';
}

export function getDownloadUrl(url: string | undefined): string {
  if (!url) return '';
  const fileId = url.match(/\/d\/(.*?)\/view/)?.[1];
  return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : '';
}