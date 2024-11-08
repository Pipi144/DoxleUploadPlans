"use client";

import { useState } from "react";

function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  return { showPassword, setShowPassword };
}

export default useLogin;
