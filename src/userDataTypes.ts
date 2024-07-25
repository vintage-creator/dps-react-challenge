export interface User {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    city: string;
  }
  
  export interface UserWithHighlight extends User {
    isOldest?: boolean;
  }
  