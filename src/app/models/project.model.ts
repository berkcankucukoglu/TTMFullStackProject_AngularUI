export interface Project {
  id: number | null;
  name: string;
  description: string | null;
  lastModifieldDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  status: boolean;
  userId: number;
  categoryId: number;
  duties: [];
}
