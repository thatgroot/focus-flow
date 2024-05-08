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
  QuerySnapshot,
} from "firebase/firestore";
import { auth, database } from "./firebase";
import {
  formatTime,
  getStartTimeInMinutes,
  toSchedules,
  toSessions,
} from "./helpers";
import { addDays, milliseconds } from "date-fns";
import { Alert } from "react-native";
// CRUD function for Firestore operations
async function performCrud({
  path,
  data,
  method = "set",
  onSuccess,
  onError,
}: {
  path: string;
  data: any;
  method?: "set" | "update" | "delete" | "get" | "getAll";
  onSuccess: (id: string) => void;
  onError: (error: string) => void;
}) {
  const ref = doc(database, path);
  try {
    if (method === "set") await setDoc(ref, data);
    else if (method === "update") await updateDoc(ref, data);
    else if (method === "delete") await deleteDoc(ref);
    else if (method === "getAll") {
      const ref = collection(database, path);
      return await getDocs(query(ref));
    } else if (method === "get") {
      return await getDoc(ref);
    }
    onSuccess(ref.id);
  } catch (error: any) {
    onError(error.message);
  }
}

// Function to get documents from Firestore
async function getDocuments(query: Query<DocumentData>): Promise<any[]> {
  const snapshot = await getDocs(query);
  return snapshot.docs.map((doc) => doc.data());
}

// Function to create a document in Firestore
async function createDocument<T>({
  path,
  data,
  onSuccess,
  onError,
}: {
  path: string;
  data: T;
  onSuccess: (id: string) => void;
  onError: (error: string) => void;
}) {
  await performCrud({
    path,
    data,
    onSuccess,
    onError,
  });
}

// Function to update a document in Firestore
async function updateDocument<T>({
  path,
  data,
  onSuccess,
  onError,
}: {
  path: string;
  data: T;
  onSuccess: (id: string) => void;
  onError: (error: string) => void;
}) {
  await performCrud({
    path,
    data,
    method: "update",
    onSuccess,
    onError,
  });
}

// Function to delete a document in Firestore
async function deleteDocument({
  path,
  onSuccess,
  onError,
}: {
  path: string;
  onSuccess: (id: string) => void;
  onError: (error: string) => void;
}) {
  await performCrud({
    data: undefined,
    path,
    method: "delete",
    onSuccess,
    onError,
  });
}
const getDocsQuery = async (query: Query<DocumentData, DocumentData>) => {
  const tasksSnapshot = await getDocs(query);
  return tasksSnapshot.docs.map((doc) => doc.data());
};

export const controllers = {
  userInfo: {
    add: async (args: WithOmitPath & { data: UserInfoData }) => {
      await createDocument({
        path: `users/${auth.currentUser?.uid}/info`,
        ...args,
      });
    },
    update: async ({
      id,
      ...args
    }: WithOmitPath & { id: string; data: Subject }) => {
      await updateDocument({
        path: `users/${auth.currentUser?.uid}/info/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${auth.currentUser?.uid}/info/${id}`,
        ...args,
      });
    },
    get: async (args: WithOmitPath & { id: string }): Promise<UserInfoData> => {
      const ref = collection(database, `users/${auth.currentUser?.uid}/info`);
      const data = await getDocs(query(ref));

      return data.docs.map((doc) => doc.data())[0];
    },
  },
  course: {
    add: async (args: WithOmitPath & { data: Subject }) => {
      await createDocument({
        path: `courses/${auth.currentUser?.uid}`,
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
    add: async ({
      data,
      onError,
      onSuccess,
    }: WithOmitPath & { data: Task }) => {
      const ref = collection(database, `users/${auth.currentUser?.uid}/tasks`);
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
    }: WithOmitPath & { id: string; data: Task }) => {
      await updateDocument({
        path: `users/${auth.currentUser?.uid}/tasks/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${auth.currentUser?.uid}/tasks/${id}`,
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
      const ref = collection(
        database,
        `users/${auth.currentUser?.uid}/classes`
      );
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
        path: `users/${auth.currentUser?.uid}/classes/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${auth.currentUser?.uid}/classes/${id}`,
        ...args,
      });
    },
  },
  group: {
    search: async ({ title }: Pick<Group, "title">) => {
      const ref = collection(database, `groups`);
      const _query = query(ref, where("title", "==", title.trim()));
      const groups = await getDocsQuery(_query);
      return groups as Group[];
    },

    add: async (args: WithOmitPath & { data?: Group }) => {
      const ref = collection(database, `groups`);
      await addDoc(ref, { ...args.data })
        .then(async (newGroupRef) => {
          await performCrud({
            path: `groups/${newGroupRef.id}`,
            data: {
              ...args.data,
              id: newGroupRef.id,
            },
            onError: args.onError,
            onSuccess: async (id) => {
              const userGroupsRef = doc(
                database,
                `users/${auth.currentUser?.uid}/groups/${newGroupRef.id}`
              );
              await setDoc(userGroupsRef, { id: newGroupRef.id }).then(
                (_ref) => {
                  args.onSuccess(newGroupRef.id);
                }
              );
            },
          });
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
        path: `users/${auth.currentUser?.uid}/groups/${id}`,
        ...args,
      });
    },
    delete: async ({
      id,
      ...args
    }: WithOmitPath & { id: string }): Promise<void> => {
      await deleteDocument({
        path: `users/${auth.currentUser?.uid}/groups/${id}`,
        ...args,
      });
    },
    join: async ({ id, onSuccess, onError }: WithOmitPath & { id: string }) => {
      const ref = doc(database, `members/${id}`);
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) {
        await setDoc(ref, {
          members: [auth.currentUser?.uid],
        }).then(async () => {
          await createDocument({
            path: `users/${auth.currentUser?.uid}/memberOf/${id}`,
            data: { id, joinedOn: new Date() },
            onSuccess,
            onError,
          });
        });
      } else {
        const _doc = await getDoc(ref);
        const data = _doc.data() !== undefined ? _doc.data() : { members: [] };
        if (data !== undefined) {
          if (data["members"].includes(auth.currentUser?.uid)) {
            onError("You are already a group member");
          } else {
            updateDoc(ref, {
              members: [...data["members"], auth.currentUser?.uid],
            }).then(() => {
              onSuccess(ref.id);
            });
          }
        }
      }
    },
    sessions: {
      add: async ({
        groupId,
        data,
        onError,
        onSuccess,
      }: WithOmitPath & { groupId: string; data: StudySession }) => {
        async function addToGroupSessions() {
          const session_data = {
            status: data.status,
            uid: auth.currentUser?.uid,
            name: auth.currentUser?.displayName,
          };
          const ref = doc(
            database,
            `group_sessions/${groupId}/sessions/${auth.currentUser?.uid}`
          );
          try {
            const docSnapshot = await getDoc(ref);
            if (!docSnapshot.exists()) {
              await performCrud({
                method: "set",
                path: `group_sessions/${groupId}/sessions/${auth.currentUser?.uid}`,
                data: session_data,
                onError,
                onSuccess,
              });
            } else {
              await performCrud({
                method: "update",
                path: `group_sessions/${groupId}/sessions/${auth.currentUser?.uid}`,
                data: session_data,
                onError,
                onSuccess,
              });
            }
          } catch (error: any) {
            onError(error.message);
          }
        }
        const ref = doc(
          database,
          `users/${auth.currentUser?.uid}/sessions/${groupId}`
        );
        try {
          const docSnapshot = await getDoc(ref);
          if (!docSnapshot.exists()) {
            await performCrud({
              method: "set",
              path: `users/${auth.currentUser?.uid}/sessions/${groupId}`,
              data,
              onError,
              onSuccess,
            });
          } else {
            await performCrud({
              method: "update",
              path: `users/${auth.currentUser?.uid}/sessions/${groupId}`,
              data,
              onError,
              onSuccess,
            });
          }
          addToGroupSessions();
        } catch (error: any) {
          onError(error.message);
        }
      },
      update: async ({
        group,
        ...args
      }: WithOmitPath & { group: string; data: GroupSession }) => {
        await updateDocument({
          path: `users/${auth.currentUser?.uid}/sessions/${group}`,
          ...args,
        });
      },
      get: async () => {
        const ref = collection(
          database,
          `users/${auth.currentUser?.uid}/sessions`
        );
        const data = await getDocs(query(ref));
        return data.docs.map((doc) => doc.data());
      },
      getFor: async (groupId: string) => {
        const groupRef = doc(
          database,
          `users/${auth.currentUser?.uid}/sessions/${groupId}`
        );
        const snapshot = await getDoc(groupRef);
        return snapshot.data() as StudySession;
      },
      liveCount: async ({ groupId }: {   groupId: string }) => {
        const ref = collection(database, `group_sessions/${groupId}/sessions`);
        const _query = query(ref, where("status", "==", "active"));
        const data = (await getDocsQuery(_query)) as GroupSession[];
        return {
          count: data.length,
          data,
        };
      },
    },
    groupInfo: async (groupId: string) => {
      const ref = collection(database, `members/${groupId}`);
      const data = await getDocs(query(ref));
      const members: string[] = data.docs[0].data().members; // assuming "members" is an array of user IDs
      return members;
    },
    get: async () => {
      const ref = collection(database, `users/${auth.currentUser?.uid}/groups`);
      const data = await getDocs(query(ref));

      return data.docs.map((doc) => doc.data());
    },

    live: async () => {},
    joined: async () => {
      const ref = collection(
        database,
        `users/${auth.currentUser?.uid}/memberOf`
      );
      const data = await getDocs(query(ref));
      const groups: Group[] = [];
      await Promise.all(
        data.docs.map(async ({ id }) => {
          const groupRef = doc(database, `groups/${id}`);
          const snapshot = await getDoc(groupRef);

          const membersRef = doc(database, `members/${id}`);
          const membersSnapshot = await getDoc(membersRef);
          if (snapshot.exists() && membersSnapshot.exists()) {
            const members = membersSnapshot.data()["members"];
            snapshot.data();
            groups.push({
              id: snapshot.id,
              ...(snapshot.data() as Group),
              memberCount: members.length as number,
            });
          }
        })
      );
      return groups;
    },
  },
};

function buildScheduleQuery(type: "tasks" | "classes") {
  const path = `users/${auth.currentUser?.uid}/${type}`;
  return query(
    collection(database, path),
    where("endDate", ">=", addDays(new Date(), 0)), // Today or later
    where("endDate", "<=", addDays(new Date(), 14)) // Within the next 3 days
  );
}

export function arrangeByStartTime({
  classes,
  tasks,
}: {
  classes: Class[];
  tasks: Task[];
}): {
  time: string;
  items: Schedule[];
}[] {
  const combinedData: Schedule[] = [...tasks, ...classes];

  combinedData.sort((a, b) => {
    const aStartTime = getStartTimeInMinutes(a.startTime);
    const bStartTime = getStartTimeInMinutes(b.startTime);
    return aStartTime - bStartTime;
  });

  // Group items by time
  const arrangedData: { time: string; items: Schedule[] }[] = [];
  let currentStartTime: number = 0;
  let currentItems: Schedule[] = [];

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

export async function getDueDates() {
  const tasksQuery = buildScheduleQuery("tasks");
  const classesQuery = buildScheduleQuery("classes");
  const tasks = toSchedules(await getDocsQuery(tasksQuery));
  const classes = toSchedules(await getDocsQuery(classesQuery));
  const sessions = toSessions(await controllers.group.sessions.get());
  return { classes, tasks, sessions };
}
