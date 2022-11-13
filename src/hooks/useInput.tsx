import { useState, useCallback, Dispatch, SetStateAction } from "react";

function useInput<T>(
  initalValue: T
): [T, Dispatch<SetStateAction<T>>, (e?: React.ChangeEvent) => void] {
  const [value, setValue] = useState<typeof initalValue>(initalValue);
  const changer = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, changer];
}

export default useInput;
