export interface GalleryImage {
  id: string;
  name: string;
  value: string;
}

export interface GalleryActions {
  onPrevious: () => void;
  onNext: () => void;
  onThumbnailClick: (imageName: string) => void;
  onLike?: () => void;
  onShare?: () => void;
}

export interface GalleryState {
  selectedImage: string;
  images: GalleryImage[];
}
