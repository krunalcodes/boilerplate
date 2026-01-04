import { Button } from "@saas/ui/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@saas/ui/components/ui/input-group";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function InputPassword({ className, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <InputGroup className={className}>
      <InputGroupInput type={showPassword ? "text" : "password"} className={className} {...props} />
      <InputGroupAddon align="inline-end">
        <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <LuEyeOff className="size-4" /> : <LuEye className="size-4" />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
