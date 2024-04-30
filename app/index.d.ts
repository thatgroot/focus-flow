type WithOmitPath = Omit<CreateDocumentType, "path">;

interface CreateDocumentTypScaffold {
  onSuccess: (id:string) => void;
  onError: (error: any) => void;
}

interface CreateDocumentType extends CreateDocumentTypScaffold {
  path: string;
}
// - courses -> uid -> name, timestamp
interface Course {
    name: string;
}

// - schedule -> uid ->  type, course, tags, period, notes, date{start,end}, time{start,end},completed
interface Schedule {
    entity: {
      type: "class" | "task";
      name: string;
      course: string;
    };
    tags: string[] | never[];
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
    }
  };
}

//
// - groups -> uid -> title, bio, time
interface Group {
  uid: string;
  data: {
    title: string;
    bio: string;
  };
}
// - members -> group_id ->  user_id
interface Members {
  id: string;
  data: {
    users: string[];
  };
}
// - leadership -> group ->  uid, time, live
interface Leadership {
  id: string;
  data: {
    group: string;
    user: string;
    time: number;
    live: boolean;
  };
}
