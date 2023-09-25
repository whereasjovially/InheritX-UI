import {
  AddUserDetails,
  UpdateUserDetails,
  userDetailsArgs,
} from "@/declarations/will/will.did";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Center,
  AbsoluteCenter,
  Spinner,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import {
  transformData,
  validateBirthDate,
  validateBirthLocationCode,
  validateFirstNames,
  validateLastName,
  validateSex,
} from "./utils";
import { useState } from "react";
import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import {
  birthDateAtom,
  birthLocationCodeAtom,
  firstNamesAtom,
  isProfileFormOpen,
  isUserExistsAtom,
  lastNameAtom,
  principalAtom,
  sexAtom,
} from "@/state/jotai";
import { useAtom } from "jotai";
export function ProfileForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setProfileResult] = useState<boolean>(false);

  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [, setError] = useState<string | null>(null);
  const [, setOpen] = useAtom(isProfileFormOpen);
  const [, setPrincipal] = useAtom(principalAtom);
  const [firstNames, setFirstNames] = useAtom(firstNamesAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [sex, setSex] = useAtom(sexAtom);
  const [birthDate, setBirthDate] = useAtom(birthDateAtom);
  const [birthLocationCode, setBirthLocationCode] = useAtom(
    birthLocationCodeAtom
  );

  const toast = useToast();

  async function profileSubmit(userDetails: userDetailsArgs) {
    const actorWill: WILL = await createActor("will");
    if (isUserExists) {
      try {
        setLoading(true);
        const updateProfile: UpdateUserDetails =
          await actorWill.update_user_details(userDetails);
        console.log(
          "🚀 ~ file: user.ts:62 ~ submitProfile ~ updateProfile:",
          updateProfile
        );
        if ("success" in updateProfile && updateProfile.success === true) {
          setProfileResult(true);
          toast({
            title: "Profile Updated.",
            description: JSON.stringify(updateProfile),
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setLoading(false);
          setOpen(false);
          setUserExists(true);

          setPrincipal(null);
          setFirstNames(null);
          setLastName(null);
          setSex(null);
          setBirthDate(null);
          setBirthLocationCode(null);
        } else {
          toast({
            title: `Error`,
            description: `${JSON.stringify(updateProfile)}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log("🚀 ~ file: user.ts:62 ~ submitProfile ~ error:", error);
        setError(error as string);
        toast({
          title: "Error occured while Updating Profile.",
          description: JSON.stringify(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      try {
        setLoading(true);

        const createProfile: AddUserDetails = await actorWill.add_user_details(
          userDetails
        );
        if ("success" in createProfile && createProfile.success === true) {
          setProfileResult(true);
          toast({
            title: "Profile Created.",
            description: JSON.stringify(createProfile),
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          setLoading(false);
          setOpen(false);
          setUserExists(true);
        } else {
          toast({
            title: `Error`,
            description: `${JSON.stringify(createProfile)}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log("🚀 ~ file: user.ts:98 ~ submitProfile ~ error:", error);
        setError(error as string);
        toast({
          title: "Error occured while Creating Profile.",
          description: JSON.stringify(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }

  async function submitProfileForm(
    data: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) {
    const profileArgs: userDetailsArgs = transformData(data);
    await profileSubmit(profileArgs);
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 1000);
  }

  if (loading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return (
    <Box className=" w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Formik
          initialValues={{
            firstNames: firstNames ? firstNames?.replaceAll(" ", ",") : "",
            lastName: lastName ? lastName : "",
            sex: sex ? sex : "",
            birthDate: birthDate ? birthDate : "",
            birthLocationCode: birthLocationCode ? birthLocationCode : "",
          }}
          onSubmit={async (
            values: any,
            actions: { setSubmitting: (arg0: boolean) => void }
          ) => {
            await submitProfileForm(values, actions);
          }}
        >
          {(props: { isSubmitting: any }) => (
            <Form>
              <Field name="firstNames" validate={validateFirstNames}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.firstNames && form.touched.firstNames
                    }
                  >
                    <FormLabel>First name(s)</FormLabel>
                    <Input {...field} placeholder="name1,name2,.." />
                    <FormErrorMessage>
                      {form.errors.firstNames}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Field name="lastName" validate={validateLastName}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.lastName && form.touched.lastName}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>{" "}
              <br />
              <Field name="sex" validate={validateSex}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.sex && form.touched.sex}
                  >
                    <FormLabel> Sex</FormLabel>
                    <Input {...field} placeholder="F/M" />
                    <FormErrorMessage>{form.errors.sex}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>{" "}
              <br />
              <Field name="birthDate" validate={validateBirthDate}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.birthDate && form.touched.birthDate}
                  >
                    <FormLabel> Birth Date</FormLabel>
                    <Input {...field} placeholder="YYYY-MM-DD" />
                    <FormErrorMessage>{form.errors.birthDate}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>{" "}
              <br />
              <Field
                name="birthLocationCode"
                validate={validateBirthLocationCode}
              >
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.birthLocationCode &&
                      form.touched.birthLocationCode
                    }
                  >
                    <FormLabel> Birth Postal Code</FormLabel>
                    <Input {...field} placeholder="12345" />
                    <FormErrorMessage>
                      {form.errors.birthLocationCode}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Flex>
                {" "}
                <Center>
                  {" "}
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Center>{" "}
                <Center>
                  {" "}
                  <Button
                    mt={4}
                    onClick={() => {
                      setOpen(false);
                    }}
                    colorScheme="teal"
                    // isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Cancel
                  </Button>
                </Center>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
