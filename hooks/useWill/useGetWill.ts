import { WILL } from "@/configs/canistersService";
import { Will, _AzleResult } from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export function useGetWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [will, setWill] = useState<Will | null>(null);
  ///atoms

  const toast = useToast();

  const fetchGetWill = async (identifier: number) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const willDetailsResult: _AzleResult = await actorWill.get_will(
        identifier
      );
      console.log(
        "🚀 ~ file: will.ts:218 ~ fetchGetWill ~ willDetailsResult:",
        willDetailsResult
      );

      if ("Ok" in willDetailsResult) {
        setWill(willDetailsResult.Ok);
        setLoading(false);
      } else {
        setLoading(false);

        showToast(
          toast,
          "Error Occured in Getting will Details",
          JSON.stringify(error),
          "error",
          "top"
        );
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      setLoading(false);

      showToast(
        toast,
        "Error Occured in Getting will Details",
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };
  return [will, fetchGetWill, isLoading] as const;
}
