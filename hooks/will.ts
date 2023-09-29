import { WILL } from "@/configs/canistersService";
import {
  ManualReply,
  ManualReply_1,
  ManualReply_3,
  ManualReply_4,
  Will,
  _AzleResult,
} from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import {
  heirsWillsAtom,
  identifierAtom,
  isClaimDetailsCloseAtom,
  isDeleteDetailsCloseAtom,
  isUserExistsAtom,
  testatorWillsAtom,
} from "@/state/jotai";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function useWillIdentifier() {
  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [identifier, setIdentifier] = useAtom(identifierAtom);

  const toast = useToast();

  const requestWillIdentifier = async () => {
    try {
      console.log("Request Identifier Running...");
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const requestWillIdentifierResult =
        await actorWill.request_random_will_identifier();
      console.log(
        "🚀 ~ file: will.ts:24 ~ requestWillIdentifier ~ requestWillIdentifierResult:",
        requestWillIdentifierResult
      );

      setIdentifier(requestWillIdentifierResult);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err as string);
      toast({
        title: "Account created.",
        description: JSON.stringify(err),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return [identifier, requestWillIdentifier, isLoading, error] as const;
}

export function useTestator() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [testatorWills, setTestatorWills] = useAtom(testatorWillsAtom);

  const toast = useToast();
  useEffect(() => {
    const fetchTestatorWills = async () => {
      try {
        setLoading(true);
        console.log("Request Identifier Running...");
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const willsForTestator = await actorWill.get_willsT();
        console.log(
          "🚀 ~ file: will.ts:62 ~ fetchTestatorWills ~ willsForTestator:",
          willsForTestator
        );
        setTestatorWills(willsForTestator);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err as string);
        toast({
          title: "Error occured.",
          description: JSON.stringify(err),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    if (testatorWills) {
      console.log("Fetching Testator Wills Not Running");
    } else {
      console.log("Fetching Testator Wills Is Running");
      fetchTestatorWills();
    }
  });

  return [testatorWills, isLoading, error] as const;
}

//hook to fetch all wills for claimer

export function useHeirs() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [heirsWills, setHeirsWills] = useAtom(heirsWillsAtom);

  const toast = useToast();
  useEffect(() => {
    const fetchHeirsWills = async () => {
      try {
        setLoading(true);
        console.log("Request Heirs list Running...");
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const willsForHeirs = await actorWill.get_willsC();
        console.log(
          "🚀 ~ file: will.ts:62 ~ fetchHeirsWills ~ willsForHeirs:",
          willsForHeirs
        );
        setHeirsWills(willsForHeirs);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err as string);
        toast({
          title: "Error occured.",
          description: JSON.stringify(err),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    if (heirsWills) {
      console.log("Fetching Heirs Wills Not Running");
    } else {
      console.log("Fetching Heirs Wills Is Running");
      fetchHeirsWills();
    }
  });

  return [heirsWills, isLoading, error] as const;
}

//------------------Hook for Deleting Will---------------

export function useDeleteWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  ///atoms
  const [testatorWills, setTestatorWills] = useAtom(testatorWillsAtom);
  const [isDeleteDetailsClose, setIsDeleteDetailsClose] = useAtom(
    isDeleteDetailsCloseAtom
  );
  const toast = useToast();

  const deleteWill = async (identifier: number, willType: string) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const deleteWillResult: ManualReply_3 = await actorWill.delete_will(
        identifier,
        willType
      );
      console.log(
        "🚀 ~ file: will.ts:164 ~ deleteWill ~ deleteWillResult:",
        deleteWillResult
      );
      if (
        ("icrc" in deleteWillResult &&
          "icpRetainResult" in deleteWillResult.icrc &&
          "success" in deleteWillResult.icrc.icpRetainResult &&
          deleteWillResult.icrc.icpRetainResult.success === true) ||
        ("icrc" in deleteWillResult &&
          "ckbtcRetainResult" in deleteWillResult.icrc &&
          "success" in deleteWillResult.icrc.ckbtcRetainResult &&
          deleteWillResult.icrc.ckbtcRetainResult.success === true)
      ) {
        toast({
          title: "Will Deleted Successfully",
          description: JSON.stringify(error, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        setTestatorWills(null);
        setIsDeleteDetailsClose(true);
      } else {
        toast({
          title: "Error occured.",
          description: JSON.stringify(deleteWillResult, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      toast({
        title: "Error occured.",
        description: JSON.stringify(error, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return [deleteWill, isLoading] as const;
}

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
        toast({
          title: "Error occured.",
          description: JSON.stringify(error, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      toast({
        title: "Error occured.",
        description: JSON.stringify(error, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return [will, fetchGetWill, isLoading] as const;
}

export function useClaimWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  ///atoms
  const [, setHeirsWills] = useAtom(heirsWillsAtom);
  const [isClaimDetailsClose, setIsClaimDetailsClose] = useAtom(
    isClaimDetailsCloseAtom
  );

  const toast = useToast();

  const claimWill = async (identifier: number, willType: string) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const claimWillResult: ManualReply_1 = await actorWill.claim_will(
        identifier,
        willType
      );

      if (
        ("icrc" in claimWillResult &&
          "icpClaimResult" in claimWillResult.icrc &&
          "success" in claimWillResult.icrc.icpClaimResult &&
          claimWillResult.icrc.icpClaimResult.success === true) ||
        ("icrc" in claimWillResult &&
          "ckbtcClaimResult" in claimWillResult.icrc &&
          "success" in claimWillResult.icrc.ckbtcClaimResult &&
          claimWillResult.icrc.ckbtcClaimResult.success === true)
      ) {
        toast({
          title: "Will Claim Successfully",
          description: JSON.stringify(error, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        setHeirsWills(null);
        setIsClaimDetailsClose(true);
      } else {
        toast({
          title: "Error occured.",
          description: JSON.stringify(claimWillResult, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      toast({
        title: "Error occured.",
        description: JSON.stringify(error, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return [claimWill, isLoading] as const;
}
export function useReportDeath() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDied, setIsDied] = useState<boolean>(false);

  ///atoms

  const toast = useToast();

  const reportDeath = async (identifier: number, base64Id: string) => {
    console.log(
      "🚀 ~ file: will.ts:369 ~ reportDeath ~ identifier:",
      identifier
    );
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const reportDeathResult: ManualReply_4 =
        await actorWill.report_death_by_base64Id(identifier, base64Id);
      if ("result" in reportDeathResult && reportDeathResult.result === true) {
        toast({
          title: "Death Report Verified",
          description: JSON.stringify(error, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        setIsDied(true);
      } else {
        toast({
          title: "Error Occured",
          description: JSON.stringify(reportDeathResult, (key, value) => {
            return typeof value === "bigint" ? value.toString() : value;
          }),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      toast({
        title: "Error occured.",
        description: JSON.stringify(error, (key, value) => {
          return typeof value === "bigint" ? value.toString() : value;
        }),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return [isDied, reportDeath, isLoading] as const;
}

export function useCheckDeath() {
  const [error, setError] = useState<string | null>(null);
  const [isDied, setIsDied] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const checkDeath = async (identifier: number) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const checkDeathResult: ManualReply =
        await actorWill.check_death_by_identifier(identifier);

      if ("result" in checkDeathResult && checkDeathResult.result === true) {
        setIsDied(true);
        setLoading(false);
      } else {
        console.log(checkDeathResult);
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ file: will.ts:427 ~ checkDeath ~ error:", error);
    }
  };

  return [isDied, checkDeath, isLoading] as const;
}
