import { axiosInstance } from "@/lib/axiosInstance";
import {
  LoginSchema,
  RegisterSchema,
  type LoginModel,
  type RegisterModel,
} from "@/Models/AuthModels";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

const register = async (data: RegisterModel) => {
  const { confirm_password, ...rest } = data;
  const response = await axiosInstance.post("/register", rest);
  return response.data;
};

export const useRegister = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterModel) => register(data),
    onSuccess: () => {

      window.location.href = "/login";
    },
    onError: (err) => {
      console.log(err);
      
      alert("Registrasi Gagal");
    },
  });
  return {
    form,
    mutation,
  };
};

const login = async (data: LoginModel) => {
  const response = await axiosInstance.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useLogin = () => {
  const [, setCookie] = useCookies(["id", "role", "token"]);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginModel) => login(data),
    onSuccess: (data) => {
      
      window.location.href = "/";
      setCookie("id", data?.data?.id);
      setCookie("token", data?.data?.token.access_token);
      setCookie("role", data?.data?.role);
    },
    onError: (err) => {
      alert(err)
      console.log(err);
      
    }
  });
  return {
    mutation,
    form,
  };
};
