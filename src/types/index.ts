export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType;
}

export interface GenerateImageResponse {
  imageUrl: string;
  success: boolean;
  error?: string;
}

export interface SteganoResponse {
  success: boolean;
  message?: string;
  error?: string;
  imageUrl?: string;
}