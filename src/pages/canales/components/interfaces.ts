// src/interface.ts
export interface Channel {
  id: number;
  name: string;
  owner: string;
  isPublic: boolean;
  isActive: boolean;
  avatar: string;
  banner: string;
  subscribers: number;
  videos: number;
  description?: string;
  category?: string;
  isFavorite: boolean;
  isSubscribed: boolean;
  notificationLevel: 'all' | 'none' | 'custom';
}
