"use client";

import useDebounce from "@/app/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import Input from "./Input";

export function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 450);

  useEffect(() => {
    const query = { query: debouncedValue };
    const url = qs.stringifyUrl({ url: "/search?query=", query });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div>
      <Input
        placeholder="Enter a song name or artist..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
