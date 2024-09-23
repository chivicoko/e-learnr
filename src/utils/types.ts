export interface Chapter {
  title: string;
  status: 'completed' | 'in progress' | 'locked';
}

export interface Instructor {
  name: string;
  bio: string;
  image: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface Discussion {
  user: string;
  image: string;
  comment: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  lecturer: string;
  image: string;
  video: string;
  description: string;
  reviews: Review[];
  discussions: Discussion[];
  resources: Resource[];
  instructors: Instructor[];
  chapters: Chapter[];
}

export interface Department {
  id: string;
  name: string;
  courses: Course[];
}

export interface Tab {
  name: string;
}
