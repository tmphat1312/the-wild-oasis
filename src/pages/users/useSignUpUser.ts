import { toast } from "@/lib/toast";
import { signUpUser } from "@/services/APIAuth";
import { useMutation } from "@tanstack/react-query";

export function useSignUpUser() {
  const query = useMutation({
    mutationFn: signUpUser,
    onMutate: () => {
      toast.loading("Creating user...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  return {
    isLoading: query.isPending,
    signUp: query.mutate,
  };
}
