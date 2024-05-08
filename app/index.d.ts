type WithOmitPath = Omit<CreateDocumentType, "path">;
// Enum for recurrence types
type Recurrence = "daily" | "weekly" | "monthly";

interface CreateDocumentTypScaffold {
  onSuccess: (value: string | any) => void;
  onError: (error: any) => void;
}

interface FirebaseConfig  {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface CreateDocumentType extends CreateDocumentTypScaffold {
  path: string;
}

interface UserInfoData {
  name?: string;
  username?: string;
}
// - courses -> uid -> name, timestamp
interface Subject {
  name: string;
}
type SessionStatus = "active" | "paused" | "inactive";
type ScheduleType = "class" | "task" | undefined;
// - schedule -> uid ->  type, course, tags, period, notes, date{start,end}, time{start,end},completed
interface Schedule {
  subject: string;
  startDate: Date;
  endDate: Date;
  note: string;
  tags: string[] | [];
  startTime: Date;
  endTime: Date;
  schedule: "daily" | "monthly" | "weekly"; // This will be a common property for both Task and Class
  completionStatus: boolean;
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
  uid?: string;
  id?: string;
  title: string;
  bio: string;
  time: string;
  memberCount?: number;
}

interface DayType  {
    date: number;
    day: string;
}

type WeekType   = DayType[]

// - groups -> uid -> title, bio, time
interface GroupSession {
    status: SessionStatus,
    uid:string,
    name:string,
}

interface StudySession {
  timeSpent?: string;
  status: SessionStatus;
}
// Interface for tags
interface Tag {
  name: string;
}

// Interface for task data
interface Task extends Schedule {}

interface Class extends Schedule {}
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
