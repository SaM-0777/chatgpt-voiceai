import { useEffect, useState } from "react";


export default function useUser<T>(initialValue: string | object | undefined) {
  const [user, setUser] = useState<string | object | undefined>(initialValue)
  
  return [user, setUser] as const
};

