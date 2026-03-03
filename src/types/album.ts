/** 相册 */
export interface Album {
  id: string;
  name: string;
  description?: string;
  coverPhotoId?: string | null;
  createdAt: string; // ISO
  updatedAt: string;
}

/** 图片（元数据，文件在 public/uploads） */
export interface Photo {
  id: string;
  albumId: string;
  filename: string; // 存储文件名，如 uuid.jpg
  originalName: string;
  url: string; // 对外路径，如 /uploads/xxx.jpg
  size: number; // bytes
  width?: number;
  height?: number;
  createdAt: string;
}

export interface AlbumWithPhotos extends Album {
  photos: Photo[];
  photoCount: number;
}
