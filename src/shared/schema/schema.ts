export interface CreateTaskInput {
  assigneeId?: string;
  dueDate: string;
  name: string;
  pointEstimate: PointEstimate;
  status: Status;
  tags: TaskTag[];
}

export interface UpdateTaskInput {
  assigneeId?: string;
  dueDate?: string;
  id: string;
  name?: string;
  pointEstimate?: PointEstimate;
  position?: number;
  status?: Status;
  tags: TaskTag[];
}

export interface DeleteTaskInput {
  id: string;
}

export interface FilterTaskInput {
  assigneeId?: string;
  dueDate?: String;
  name?: string;
  ownerId?: string;
  pointEstimate?: PointEstimate;
  status?: Status;
  tags: TaskTag[];
}

export type Mutation = {
  createTask(input: CreateTaskInput): Task;
  deleteTask(input: DeleteTaskInput): Task;
  updateTask(input: UpdateTaskInput): Task;
};

export type Query = {
  profile: User;
  tasks(input: FilterTaskInput): Task[];
  users: User[];
};

export type Task = {
  __typename?: string;
  assignee?: User;
  createdAt: string;
  creator: User;
  dueDate: string;
  id: string;
  name: string;
  pointEstimate: PointEstimate;
  position: number;
  status: Status;
  tags: TaskTag[];
};

export type User = {
  avatar?: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: UserType;
  updatedAt: string;
};

export enum Status {
  BACKLOG = "BACKLOG",
  CANCELLED = "CANCELLED",
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  TODO = "TODO",
}

export enum TaskTag {
  ANDROID = "ANDROID",
  IOS = "IOS",
  NODE_JS = "NODE_JS",
  RAILS = "RAILS",
  REACT = "REACT",
}

export enum UserType {
  ADMIN = "ADMIN",
  CANDIDATE = "CANDIDATE",
}

export enum PointEstimate {
  EIGHT = "EIGHT",
  FOUR = "FOUR",
  ONE = "ONE",
  TWO = "TWO",
  ZERO = "ZERO",
}
