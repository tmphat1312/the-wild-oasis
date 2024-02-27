import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/lib/toast";
import { loginUser } from "@/services/APIAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData([QUERY_KEYS.user], user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isLoading: mutation.isPending,
    login: mutation.mutate,
    error: mutation.error,
  };
}
