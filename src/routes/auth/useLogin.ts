import { loginUser } from "@/services/APIAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "@/constants/query-keys";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(queryKeys.user, user);
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
