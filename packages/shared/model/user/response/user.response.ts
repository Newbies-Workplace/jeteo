export interface UserResponse {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  socials?: {
    mail?: string;
    github?: string;
    twitter?: string;
    linkedIn?: string;
  };
}
