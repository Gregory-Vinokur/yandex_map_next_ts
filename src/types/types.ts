type Location = {
  latitude: number;
  longitude: number;
}

export type DataType = {
  id: number;
  description: string;
  description_text: string;
  location: Location;
  hint: string;
}