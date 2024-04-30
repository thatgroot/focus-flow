import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "./firebase";
import { currentUID } from "./auth";

async function createDoc({
  path,
  data,
  onError,
  onSuccess,
}: CreateDocumentType & { data: any }) {
  await setDoc(doc(database, path), data)
    .then(() => {
     onSuccess("Document created successfully");
    })
    .catch(onError);
}
export const CourseController = {
  add: async (args: WithOmitPath & { data: Course }) => {
    await createDoc({
      path: `courses/${currentUID()}`,
      ...args,
    });
  },
};

export const ScheduleController = {
  add: async (args: WithOmitPath & { data: Schedule }) => {
    await createDoc({
      path: `schedules/${currentUID()}`,
      ...args,
    });
  },
};
