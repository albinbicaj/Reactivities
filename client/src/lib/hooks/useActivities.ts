import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
  const queryClient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
  });

  const updateActivity = useMutation({
    mutationFn: (activity: Activity) =>
      agent.put<void>(`/activities/${activity.id}`, activity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

    const createActivity = useMutation({
    mutationFn: (activity: Activity) =>
      agent.post<string>(`/activities`, activity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    });
  
  const deleteActivity = useMutation({
      mutationFn: (id: string) =>
      agent.delete<void>(`/activities/${id}`),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["activities"] });
      },
    })

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity
  };
};
