import { Button } from "@saas/ui/components/ui/button";
import { Spinner } from "@saas/ui/components/ui/spinner";
import { useState } from "react";
import { SiGoogle } from "react-icons/si";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function SocialLoginForm() {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSocialLogin = async () => {
    setIsPending(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    setIsPending(false);

    if (error) {
      toast.error(error.message ?? "An error occurred while logging in");
      return;
    }
  };

  return (
    <Button variant="outline" type="button" onClick={handleSocialLogin} disabled={isPending}>
      {isPending ? <Spinner /> : <SiGoogle className="size-4" />}
      Login with Google
    </Button>
  );
}
