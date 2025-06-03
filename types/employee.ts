export type Department = 
  | "Engineering"
  | "Marketing"
  | "Finance"
  | "Human Resources"
  | "Sales"
  | "Product"
  | "Design"
  | "Operations";

export interface Performance {
  rating: number; // 1-5
  review: string;
  date: string;
}

export interface Project {
  id: number;
  name: string;
  status: "Completed" | "In Progress" | "Planned";
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface Feedback {
  id: number;
  from: string;
  message: string;
  date: string;
  type: "Positive" | "Constructive" | "Recognition";
}

export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface Employee extends DummyJsonUser {
  department: Department;
  performance: {
    current: number; // 1-5 star rating
    history: Performance[];
  };
  projects: Project[];
  feedback: Feedback[];
  bio: string;
  joinDate: string;
}