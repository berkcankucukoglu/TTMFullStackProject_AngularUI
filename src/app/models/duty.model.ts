export interface Duty {
  id: number | null;
  name: string;
  description: string | null;
  lastModifieldDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  status: boolean;
  hours: number;
  userId: number;
  projectId: number;
}
