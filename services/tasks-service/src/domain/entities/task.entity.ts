export type TaskState = "Creating" | "Created";

export interface TaskProps {
  id: string;
  title: string;
  concluded: boolean;
  state: TaskState;
  userId: string;
  createdAt: Date;
}

export class Task {
  private constructor(private readonly props: TaskProps) {}

  static create(props: TaskProps): Task {
    return new Task(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get concluded(): boolean {
    return this.props.concluded;
  }

  get state(): TaskState {
    return this.props.state;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toJSON() {
    return {
      id: this.props.id,
      title: this.props.title,
      concluded: this.props.concluded,
      state: this.props.state,
      userId: this.props.userId,
      createdAt: this.props.createdAt,
    };
  }
}
