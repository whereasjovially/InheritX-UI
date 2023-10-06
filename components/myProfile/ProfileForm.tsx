import { userDetailsArgs } from "@/declarations/will/will.did";
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
import {
  birthDateAtom,
  birthLocationCodeAtom,
  firstNamesAtom,
  isProfileFormOpenAtom,
  lastNameAtom,
  principalAtom,
  sexAtom,
} from "@/state/jotai";
import { useAtom } from "jotai";
import { useProfileSubmit } from "@/hooks/useUser/useProfileSubmt";
export function ProfileForm() {
  //atoms
  const [, setOpen] = useAtom(isProfileFormOpenAtom);
  const [firstNames] = useAtom(firstNamesAtom);
  const [lastName] = useAtom(lastNameAtom);
  const [sex] = useAtom(sexAtom);
  const [birthDate] = useAtom(birthDateAtom);
  const [birthLocationCode] = useAtom(birthLocationCodeAtom);

  //hooks
  const [loading, profileSubmit] = useProfileSubmit();

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
