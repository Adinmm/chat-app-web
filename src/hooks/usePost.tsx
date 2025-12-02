import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const friendRequest = async (data: any) => {
  const response = await axiosInstance.post("friend_request", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useFriendRequest = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create_friend_request"],
    mutationFn: (data: any) => friendRequest(data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["user"],
      });
      window.location.reload();
    },
  });
  return {
    mutation,
  };
};

const friendList = async (data: any) => {
  const response = await axiosInstance.post("friend_list", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useFriendList = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create_friend_list"],
    mutationFn: (data: any) => friendList(data),
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

const createChatRoom = async (data: any) => {
  const response = await axiosInstance.post("create_chat_room", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useCreateCharRoom = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create_chat_room"],
    mutationFn: (data: any) => createChatRoom(data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["user"],
      });
      window.location.reload();
    },
  });
  return {
    mutation,
  };
};
