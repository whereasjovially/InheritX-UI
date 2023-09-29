import { WILL } from "@/configs/canistersService";
import {
  GetUserDetails,
} from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import {
  birthDateAtom,
  birthLocationCodeAtom,
  firstNamesAtom,
  isUserExistsAtom,
  lastNameAtom,
  principalAtom,
  sexAtom,
} from "@/state/jotai";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function useUser() {
  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const userExists = await actorWill.is_user_principal_found();
        console.log(
          "🚀 ~ file: useUser.tsx:13 ~ useUser ~ userExists:",
          userExists
        );
        userExists ? setUserExists(true) : setUserExists(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(error);
        toast({
          title: "Account created.",
          description:
             JSON.stringify(err),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchUserDetails();
  }, []);

  return [isUserExists, isLoading, error] as const;
}

// export function useProfileSubmit(userDetails: userDetailsArgs) {
//   //atom states
//   const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
//   const [isLoading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [profileResult, setProfileResult] = useState<boolean>(false);

//   // const toast = useToast();

//   useEffect(() => {
//     const submitProfile = async () => {
//       const actorWill: WILL = await createActor("will");
//       if (isUserExists) {
//         try {
//           setLoading(true);
//           const updateProfile: UpdateUserDetails =
//             await actorWill.update_user_details(userDetails);
//           console.log(
//             "🚀 ~ file: user.ts:62 ~ submitProfile ~ updateProfile:",
//             updateProfile
//           );
//           if ("success" in updateProfile && updateProfile.success === true) {
//             setProfileResult(true);
//             // toast({
//             //   title: "Profile Updated.",
//             //   description: JSON.stringify(updateProfile),
//             //   status: "success",
//             //   duration: 9000,
//             //   isClosable: true,
//             // });
//             setLoading(false);
//             // setUserExists(true);
//           } else {
//             // toast({
//             //   title: `Error`,
//             //   description: `${JSON.stringify(updateProfile)}`,
//             //   status: "error",
//             //   duration: 9000,
//             //   isClosable: true,
//             // });
//           }
//         } catch (error) {
//           console.log("🚀 ~ file: user.ts:62 ~ submitProfile ~ error:", error);
//           setError(error as string);
//           // toast({
//           //   title: "Error occured while Updating Profile.",
//           //   description: JSON.stringify(error),
//           //   status: "error",
//           //   duration: 9000,
//           //   isClosable: true,
//           // });
//         }
//       } else {
//         try {
//           setLoading(true);

//           const createProfile: AddUserDetails =
//             await actorWill.add_user_details(userDetails);
//           if ("success" in createProfile && createProfile.success === true) {
//             setProfileResult(true);
//             // toast({
//             //   title: "Profile Created.",
//             //   description: JSON.stringify(createProfile),
//             //   status: "success",
//             //   duration: 9000,
//             //   isClosable: true,
//             // });

//             setLoading(false);
//             // setUserExists(true);
//           } else {
//             // toast({
//             // title: `Error`,
//             //   description: `${JSON.stringify(createProfile)}`,
//             //   status: "error",
//             //   duration: 9000,
//             //   isClosable: true,
//             // });
//           }
//         } catch (error) {
//           console.log("🚀 ~ file: user.ts:98 ~ submitProfile ~ error:", error);
//           setError(error as string);
//           // toast({
//           //   title: "Error occured while Creating Profile.",
//           //   description: JSON.stringify(error),
//           //   status: "error",
//           //   duration: 9000,
//           //   isClosable: true,
//           // });
//         }
//       }
//     };
//     submitProfile();
//   }, []);
//   return [profileResult, isLoading, error];
// }

export function useUserInfo() {
  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [principal, setPrincipal] = useAtom(principalAtom);
  const [firstNames, setFirstNames] = useAtom(firstNamesAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [sex, setSex] = useAtom(sexAtom);
  const [birthDate, setBirthDate] = useAtom(birthDateAtom);
  const [birthLocationCode, setBirthLocationCode] = useAtom(
    birthLocationCodeAtom
  );

  const toast = useToast();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const user: GetUserDetails = await actorWill.get_user_details();

        if ("userDetails" in user) {
          const firstNames = user.userDetails.firstNames.join(" ");

          const year = user.userDetails.birthDate.substring(0, 4);
          const month = user.userDetails.birthDate.substring(4, 6);
          const day = user.userDetails.birthDate.substring(6, 8);

          const principal = user.userDetails.principal.toText();

          setPrincipal(principal);
          setFirstNames(firstNames);
          setLastName(user.userDetails.lastName);
          setSex(user.userDetails.sex);
          setBirthDate(`${year}-${month}-${day}`);
          setBirthLocationCode(user.userDetails.birthLocationCode);

          setLoading(false);
        } else {
          setError(JSON.stringify(user.userNotExists));
          toast({
            title: "User Not Exists.",
            description: JSON.stringify(user.userNotExists),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.log("🚀 ~ file: user.ts:162 ~ fetchUserDetails ~ err:", err);
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
    if (
      principal &&
      firstNames &&
      lastName &&
      sex &&
      birthDate &&
      birthLocationCode
    ) {
      console.log("User Fetching not running");
    } else {
      console.log("User Fetching running");

      fetchUserDetails();
    }
  }, []);

  return [
    principal,
    firstNames,
    lastName,
    sex,
    birthDate,
    birthLocationCode,
    isLoading,
    error,
  ] as const;
}
