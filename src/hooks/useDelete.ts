import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFriendRequest = async (id: string) => {
  const response = await axiosInstance.delete(`/friend_request/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
};
export const useDeleteFriendRequest = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete_friend_request"],
    mutationFn: (id: string) => deleteFriendRequest(id),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
  return {
    mutation,
  };
};
