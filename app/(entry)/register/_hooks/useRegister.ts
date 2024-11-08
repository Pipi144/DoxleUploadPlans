"use client";

import { useState } from "react";

function useRegister() {
  const [showPassword, setShowPassword] = useState(false);
  return { showPassword, setShowPassword };
}

export default useRegister;
