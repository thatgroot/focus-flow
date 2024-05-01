type WithOmitPath = Omit<CreateDocumentType, 'path'>;
// Enum for recurrence types
type Recurrence = 'daily' | 'weekly' | 'monthly';

interface CreateDocumentTypScaffold {
  onSuccess: (id: string) => void;
  onError: (error: any) => void;
}

interface CreateDocumentType extends CreateDocumentTypScaffold {
  path: string;
}
// - courses -> uid -> name, timestamp
interface Subject {
  name: string;
}

// - schedule -> uid ->  type, course, tags, period, notes, date{start,end}, time{start,end},completed
interface Schedule {
  entity: {
    type: 'class' | 'task';
    name: string;
    course: string;
  };
  tags: Tag[] | [];
  notes: string;
  period: {
    value: number;
    unit: string;
  };
  date: {
    start: Date;
    end: Date;
  };
  time: {
    start: number;
    end: number;
  };
}

// - due_dates -> ui -> type, id, date, time
interface DueDate {
  uid: string;
  data: {
    type: string;
    type_id: string;
    date?: Date | null;
    time_limit: {
      value: number;
      unit: string;
    };
  };
}

// - groups -> uid -> title, bio, time
interface Group {
  title: string;
  bio: string;
  time: {
    value: number;
    unit: 'minutes' | 'hours';
  };
}

// - groups -> uid -> title, bio, time
interface GroupSession {
  group: string;
  milliseconds: number | string;
}
// - members -> group_id ->  user_id
interface GroupMembers {
  members: { name: string; uid: string; live: boolean }[];
}
// - leadership -> group ->  uid, time, live
interface Leadership {
  group: string;
  member: string;
  time: number;
}

// Interface for tags
interface Tag {
  name: string;
}

interface ScheduleItem {
  subject: string;
  startDate: Date;
  note: string | undefined;
  endDate: Date;
  startTime: {
    hour: number;
    minutes: number;
    unit: 'am' | 'pm';
  };
  endTime: {
    hour: number;
    minutes: number;
    unit: 'am' | 'pm';
  };
  schedule: Recurrence; // This will be a common property for both Task and Class
  dayOfWeek?: number; // Optional for weekly schedule
}
// Interface for task data
interface Task extends ScheduleItem {
  tags: string[];
  completionStatus: boolean;
}

interface Class extends ScheduleItem {}
// Interface for group member data
interface GroupMember {
  uid: string;
  joinDate: Date;
  studyTimeSpent: number;
}

// Interface for leaderboard data
interface LeaderboardEntry {
  uid: string;
  username: string;
  studyTimeSpent: number;
}
