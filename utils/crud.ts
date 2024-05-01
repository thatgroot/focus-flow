import {
  DocumentData,
  Query,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { database } from "./firebase";
import { currentUID } from "./auth";
import { addDays } from "date-fns";
import { toClasses, toSessions, toTasks } from "./helpers";

async function crud({
  path,
  data,
  method = "set",
  ...args
}: CreateDocumentType & {
  data: any;
  method: "set" | "update" | "delete";
}) {
  try {
    const ref = doc(database, path);
    if (method === "set") {
      await setDoc(ref, data);
    } else if (method == "update") {
      await updateDoc(ref, data);
    } else if (method == "delete") {
      await deleteDocument({
        path,
        ...args,
      });
    }
    args.onSuccess(ref.id);
  } catch (error: any) {
    args.onError(error.message);
  }
}

const getDocsQuery = async (query: Query<DocumentData, DocumentData>) => {
  const tasksSnapshot = await getDocs(query);
  return tasksSnapshot.docs.map((doc) => doc.data());
};

const createDoc = async (args: CreateDocumentType & { data: any }) => {
  await crud({ ...args, method: "set" });
};

const updateDocument = async (args: CreateDocumentType & { data: any }) => {
  await crud({ ...args, method: "set" });
};

const deleteDocument = async ({
  path,
  onError,
  onSuccess,
}: CreateDocumentType): Promise<void> => {
  const ref = doc(database, path);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    await deleteDoc(ref)
      .then(() => {
        onSuccess(ref.id);
      })
      .catch((error: any) => {
        onError(error.message);
      });
  } else {
    onError("Document doesn't exists");
  }
};

export const controllers = {
  course: {
    add: async (args: WithOmitPath & { data: Subject }) => {
      await createDoc({
        path: `courses/${currentUID()}`,
        ...args,
      });
    },
    update: async ({
      id,
      ...args
    }: WithOmitPath & { id: string; data: Subject }) => {
      await updateDocument({
        path: `courses/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({ path: `courses/${id}`, ...args });
    },
  },
  task: {
    add: async (args: WithOmitPath & { data: Task }) => {
      const ref = collection(database, `users/${currentUID()}/tasks`);
      return await addDoc(ref, { ...args.data });
    },
    update: async ({
      id,
      ...args
    }: WithOmitPath & { id: string; data: Task }) => {
      await updateDocument({
        path: `users/${currentUID()}/tasks/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${currentUID()}/tasks/${id}`,
        ...args,
      });
    },
  },
  class: {
    add: async ({
      data,
      onError,
      onSuccess,
    }: WithOmitPath & { data: Class }) => {
      const ref = collection(database, `users/${currentUID()}/classes`);
      await addDoc(ref, { ...data })
        .then((docRef) => {
          onSuccess(docRef.id);
        })
        .catch((reason) => {
          onError(reason.message);
        });
    },
    update: async ({
      id,
      ...args
    }: WithOmitPath & { id: string; data: Class }) => {
      await updateDocument({
        path: `users/${currentUID()}/classes/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${currentUID()}/classes/${id}`,
        ...args,
      });
    },
  },
  group: {
    add: async (args: WithOmitPath & { data: Group }) => {
      const ref = collection(database, `users/${currentUID()}/groups`);
      await addDoc(ref, { ...args.data })
        .then((ref) => {
          args.onSuccess(ref.id);
        })
        .catch((reason: any) => {
          args.onError(reason);
        });
    },
    update: async ({
      id,
      ...args
    }: WithOmitPath & { id: string; data: Group }) => {
      await updateDocument({
        path: `users/${currentUID()}/groups/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${currentUID()}/groups/${id}`,
        ...args,
      });
    },
    join: async ({ id, onSuccess, onError }: WithOmitPath & { id: string }) => {
      const ref = doc(database, `members/${id}`);
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) {
        await setDoc(ref, {
          members: [currentUID()],
        }).then(() => {
          onSuccess(ref.id);
        });
      } else {
        const _doc = await getDoc(ref);
        const data = _doc.data() !== undefined ? _doc.data() : { members: [] };
        if (data !== undefined) {
          if (data["members"].includes(currentUID())) {
            onError("You are already a group member");
          } else {
            updateDoc(ref, {
              members: [...data["members"], currentUID()],
            }).then(() => {
              onSuccess(ref.id);
            });
          }
        }
      }
    },
    sessions: {
      add: async (args: WithOmitPath & { data: GroupSession }) => {
        const ref = collection(database, `users/${currentUID()}/sessions`);
        await addDoc(ref, { ...args.data })
          .then((ref) => {
            args.onSuccess(ref.id);
          })
          .catch((reason) => {
            args.onError(reason);
          });
      },
      update: async ({
        group,
        ...args
      }: WithOmitPath & { group: string; data: GroupSession }) => {
        await updateDocument({
          path: `users/${currentUID()}/sessions/${group}`,
          ...args,
        });
      },
      get: async () => {
        const ref = collection(database, `users/${currentUID()}/sessions`);
        const data = await getDocs(query(ref));
        return data.docs.map((doc) => doc.data());
      },
    },
  },
};

function buildScheduleQuery(type: "tasks" | "classes") {
  return query(
    collection(database, `users/${currentUID()}/${type}`),
    where("endDate", ">=", addDays(new Date(), 0)), // Today or later
    where("endDate", "<=", addDays(new Date(), 3)) // Within the next 3 days
  );
}

export function arrangeByStartTime({classes,tasks}: { classes: Class[]; tasks: Task[] }): {
  time: string;
  items: (Task | Class)[];
}[] {
  const combinedData: (Task | Class)[] = [...tasks, ...classes];

  // Sort by startTime
  combinedData.sort((a, b) => {
    const aStartTime = getStartTimeInMinutes(a.startTime);
    const bStartTime = getStartTimeInMinutes(b.startTime);
    return aStartTime - bStartTime;
  });

  // Group items by time
  const arrangedData: { time: string; items: (Task | Class)[] }[] = [];
  let currentStartTime: number = 0;
  let currentItems: (Task | Class)[] = [];

  for (const item of combinedData) {
    const itemStartTime = getStartTimeInMinutes(item.startTime);
    if (itemStartTime !== currentStartTime) {
      if (currentItems.length > 0) {
        arrangedData.push({
          time: formatTime(currentStartTime),
          items: currentItems,
        });
      }
      currentStartTime = itemStartTime;
      currentItems = [];
    }
    currentItems.push(item);
  }

  // Add the last group if any
  if (currentItems.length > 0) {
    arrangedData.push({
      time: formatTime(currentStartTime),
      items: currentItems,
    });
  }

  return arrangedData;
}

  function getStartTimeInMinutes(startTime: {
  hour: number;
  minutes: number;
  unit: "am" | "pm";
}): number {
  const hour = startTime.unit === "pm" ? startTime.hour + 12 : startTime.hour;
  return hour * 60 + startTime.minutes;
}

function formatTime(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  return `${formattedHour}:${formattedMinutes}`;
}

export async function getDueDates() {
  const tasksQuery = buildScheduleQuery("tasks");
  const classesQuery = buildScheduleQuery("classes");
  const tasks = toTasks(await getDocsQuery(tasksQuery));
  const classes = toClasses(await getDocsQuery(classesQuery));
  const sessions = toSessions(await controllers.group.sessions.get());

  return { classes, tasks, sessions };
}
