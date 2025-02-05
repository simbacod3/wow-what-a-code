export interface Experience {
  id: number;
  name: string;
  img: string;
  type: string;
  price: number;
  availability: boolean;
}

export interface BookedExperience extends Experience {
  startDate: string;
  endDate: string;
}
