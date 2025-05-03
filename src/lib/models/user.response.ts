export interface UserResponse {
  id: string;
  name: string;
  avatar?: string;
  jobTitle?: string;
  description?: string;
  socials: {
    mail?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface UserDetailsResponse extends UserResponse {
  _permissions: {
    isAuthorized: boolean;
  };
}
