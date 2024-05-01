export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const toTasks = (tasks: any[]): Task[] => {
  return tasks.length == 0
    ? []
    : tasks.map((task: any) => {
        return {
          subject: task.subject,
          tags: task.tags,
          startDate: new Date(task.startDate.seconds * 1000),
          endDate: new Date(task.endDate.seconds * 1000),
          startTime: {
            hour: task.startTime.hour,
            minutes: task.startTime.minutes,
            unit: task.startTime.unit,
          },
          endTime: {
            hour: task.endTime.hour,
            minutes: task.endTime.minutes,
            unit: task.endTime.unit,
          },
          schedule: task.schedule,
          completionStatus: task.completionStatus,
        };
      });
};

export const toClasses = (classes: any[]): Class[] => {
  return classes.length == 0
    ? []
    : classes.map((classData: any) => {
        return {
          subject: classData.subject,
          startDate: new Date(classData.startDate.seconds * 1000),
          endDate: new Date(classData.endDate.seconds * 1000),
          startTime: {
            hour: classData.startTime.hour,
            minutes: classData.startTime.minutes,
            unit: classData.startTime.unit,
          },
          endTime: {
            hour: classData.endTime.hour,
            minutes: classData.endTime.minutes,
            unit: classData.endTime.unit,
          },
          schedule: classData.schedule,
        };
      });
};

export const toSessions = (sessions: any[]): GroupSession[] => {
  return sessions.length == 0
    ? []
    : sessions.map((session: GroupSession) => {
        return {
          ...session,
        };
      });
};
