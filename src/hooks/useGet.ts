import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getPeople = async (id: string, search: string) => {
  const response = await axiosInstance.get(`/people/${id}?search=${search}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
};
export const useGetPeople = (id: string, search: string) => {
  const { data } = useQuery({
    queryKey: ["people", id, search],
    queryFn: () => getPeople(id, search),
    enabled: !!id,
  });
  return {
    data,
  };
};
const getUser = async (id: string) => {
  const response = await axiosInstance.get(`/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
};
export const useGetUser = (id: string) => {
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
  return {
    data,
  };
};

const getChat = async (id: string) => {
  const response = await axiosInstance.get(`/messages/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data;
};

export const useGetChat = (id: string) => {
  const { data } = useQuery({
    queryKey: ["chat"],
    queryFn: () => getChat(id),
    enabled: !!id,
  });
  return {
    data,
  };
};

const getChatRoom = async (id1: string, id2: string) => {
  const response = await axiosInstance.get(
    `/find_room_chat?id1=${id1}&id2=${id2}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

export const useGetChatRoom = (id1: string, id2: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat_room", id1, id2],
    queryFn: () => getChatRoom(id1, id2),
    enabled: !!id1 && !!id2,
  });
  return {
    data,
    isLoading
  };
};
