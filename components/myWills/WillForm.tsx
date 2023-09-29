// import {
//   AddUserDetails,
//   UpdateUserDetails,
//   userDetailsArgs,
// } from "@/declarations/will/will.did";
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
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import {
  transformData,
  validateBirthDate,
  validateBirthLocationCode,
  validateFirstNames,
  validateLastName,
  validateSex,
} from "../myProfile/utils";
import { useState } from "react";
import { CKBTC, ICP, ICRC, WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import {
  birthDateAtom,
  birthLocationCodeAtom,
  firstNamesAtom,
  identifierAtom,
  isProfileFormOpenAtom,
  isUserExistsAtom,
  isWillFormOpenAtom,
  lastNameAtom,
  principalAtom,
  sexAtom,
  testatorWillsAtom,
} from "@/state/jotai";
import { useAtom } from "jotai";
import { Principal } from "@dfinity/principal";
import { e8sToHuman, humanToE8s } from "@/utils/e8s";
import { useUserInfo } from "@/hooks/user";
import { transferWillData } from "./utils";
import {
  CreateWillArgs,
  ICRCCreateWill,
  ICRCCreateWillArgs,
  ManualReply_2,
} from "@/declarations/will/will.did";
import {
  TransferArgs,
  TransferResult as ICPTransferResult,
} from "@/declarations/icp/icp/icp_ledger.did";
import { FaLeaf } from "react-icons/fa";
import { ICRC1Account } from "@/declarations/icrc/icrc.did";
import {
  Subaccount,
  TransferArg,
  TransferResult as ckBTCTransferResult,
} from "@/declarations/ckbtc/ckbtc/ckbtc_ledger.did";

export interface CreateWillArgsU {
  heirs: Principal;
  willName: string;
  willDescription: string;
  tokenTicker: string;
  identifier: number;
  amount: bigint;
  willType: string;
}

export function WillForm() {
  const [willType, setWillType] = useState("");
  const [assetType, setAssetType] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [, setProfileResult] = useState<boolean>(false);

  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [, setError] = useState<string | null>(null);
  const [, setOpen] = useAtom(isWillFormOpenAtom);
  const [principal] = useUserInfo();
  const [identifier, setIdentifier] = useAtom(identifierAtom);
  const [testatorWills, setTestatorWills] = useAtom(testatorWillsAtom);

  const toast = useToast();

  function validateWllName(willName: any) {
    let error;
    if (typeof willName !== "string") {
      error = "Only string allowed";
    }
    return error;
  }

  function validatePrincipal(heirs: string | null) {
    let error;
    if (!heirs) {
      error = "Enter Principal";
    } else if (heirs.includes(" ")) {
      error = "No space allowed";
    } else {
      try {
        if (heirs === principal) {
          error = "Unable to create Will for Self-Principal";
        }
      } catch (err) {
        console.log(
          "🚀 ~ file: WillForm.tsx:83 ~ validatePrincipal ~ error:",
          error
        );
        error = "Please enter valid Principal";
      }
    }
    return error;
  }

  function validateICRCAmount(amount: string) {
    let error;
    if (!willType) {
      error = "Please select will type before entering amount";
    }
    if (!assetType) {
      error = "Please select asset before entering amount";
    } else if (willType === "ICRC") {
      const amountInInt = Number(amount);
      const amountInBigInt = humanToE8s(amountInInt);
      if (assetType === "ICP" && amountInBigInt <= 10000) {
        error = "Amount should be greater than 0.0001 ICP";
      } else if (assetType === "ckBTC" && amountInBigInt <= 10) {
        error = `Amount should be greater than ${e8sToHuman(10)} ckBTC`;
      }
    }
    return error;
  }
  async function willSubmit(willArgs: CreateWillArgsU) {
    if (willArgs.willType === "ICRC") {
      try {
        //create actors for canisters
        const icpLedgerActor: ICP = await createActor("icp_ledger");
        const ckbtcLedgerActor: CKBTC = await createActor("ckbtc_ledger");
        const willActor: WILL = await createActor("will");
        const icrcActor: ICRC = await createActor("icrc");

        const willObj: CreateWillArgs = {
          icrc: {
            heirs: willArgs.heirs,
            willName: willArgs.willName,
            willDescription: willArgs.willDescription,
            tokenTicker: willArgs.tokenTicker,
            identifier: willArgs.identifier,
            amount: willArgs.amount,
          },
        };
        const createWillResult: ManualReply_2 = await willActor.create_will(
          willObj,
          willArgs.willType
        );
        console.log(
          "🚀 ~ file: WillForm.tsx:158 ~ willSubmit ~ createWillResult:",
          createWillResult
        );
        if (
          "icrc" in createWillResult &&
          "success" in createWillResult.icrc &&
          createWillResult.icrc.success === true
        ) {
          //====================for ICP====================

          if (willObj.icrc.tokenTicker === "ICP") {
            //Get icp address from identifier
            const addressFromIdentifierResult =
              await icrcActor.get_canister_binary_subaccount_from_identifier(
                willArgs.identifier
              );
            const transferArgs: TransferArgs = {
              to: addressFromIdentifierResult,
              amount: { e8s: willArgs.amount },
              fee: { e8s: humanToE8s(0.0001) },
              from_subaccount: [],
              created_at_time: [],
              memo: humanToE8s(0),
            };
            const transfer: ICPTransferResult = await icpLedgerActor.transfer(
              transferArgs
            );
            console.log("🚀 ~ file: icp.ts:65 ~ transfer:", transfer);

            if ("Err" in transfer) {
              toast({
                title: "Error While trasferring ICP to Canister.",
                description: JSON.stringify(transfer, (key, value) => {
                  // <------------
                  return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
                }),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setOpen(false);
              setTestatorWills(null);
            } else if ("Ok" in transfer) {
              toast({
                title: "Will Created Sucesfully",
                description: JSON.stringify(transfer, (key, value) => {
                  // <------------
                  return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
                }),
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setOpen(false);
              setTestatorWills(null);
            } else {
              toast({
                title: "Error While trasferring ICP to Canister.",
                description: JSON.stringify(transfer, (key, value) => {
                  // <------------
                  return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
                }),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setOpen(false);
              setTestatorWills(null);
            }

            //====================for ckbtc====================
          } else if (willObj.icrc.tokenTicker === "ckBTC") {
            const toSubAccountResult = await icrcActor.getIdentifierBlob(
              willObj.icrc.identifier
            );
            const transferArgs: TransferArg = {
              to: {
                owner: Principal.from(
                  process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!
                ),
                subaccount: [toSubAccountResult],
              },
              amount: willArgs.amount,
              fee: [(10n)],
              from_subaccount: [],
              created_at_time: [],
              memo: [],
            };

            const transfer: ckBTCTransferResult =
              await ckbtcLedgerActor.icrc1_transfer(transferArgs);
            console.log("🚀 ~ file: icp.ts:65 ~ transfer:", transfer);

            if ("Err" in transfer) {
              toast({
                title: "Error While trasferring ckBTC to Canister.",
                description: JSON.stringify(transfer, (key, value) => {
                  // <------------
                  return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
                }),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setOpen(false);
              setTestatorWills(null);
            } else if ("Ok" in transfer) {
              toast({
                title: "Will Created Sucesfully",
                description: JSON.stringify(transfer, (key, value) => {
                  // <------------
                  return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
                }),
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setOpen(false);
              setTestatorWills(null);
            } else {
              toast({
                title: "Error While trasferring ckBTC to Canister.",
                description: JSON.stringify(transfer, (key, value) => {
                  // <------------
                  return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
                }),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setOpen(false);
              setTestatorWills(null);
            }
          }
        } else {
          toast({
            title: "Error occured.",
            description: JSON.stringify(createWillResult, (key, value) => {
              // <------------
              return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
            }),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log("🚀 ~ file: WillForm.tsx:229 ~ willSubmit ~ error:", error);
        toast({
          title: "Error occured.",
          description: JSON.stringify(error, (key, value) => {
            // <------------
            return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
          }),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else if (willArgs.willType === "BTC") {
    } else {
      console.log(willArgs);
    }
  }

  async function submitWillForm(
    data: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) {
    const willArgs: CreateWillArgsU = transferWillData(data);
    await willSubmit(willArgs);
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

  const handleWillTypeChange = (event: any) => {
    console.log(
      "🚀 ~ file: WillForm.tsx:85 ~ handleSelectChange ~ event:",
      event.target.value
    );
    setWillType(event.target.value);
  };
  const handleAssetTypeChange = (event: any) => {
    console.log(
      "🚀 ~ file: WillForm.tsx:85 ~ handleSelectChange ~ event:",
      event.target.value
    );
    setAssetType(event.target.value);
  };

  return (
    <Box className=" w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Formik
          initialValues={{
            willType: null,
            heirs: null,
            willName: null,
            willDescription: null,
            tokenTicker: null,
            identifier: identifier,
            amount: null,

            //For BTC later on..
            // btc:{

            // }
          }}
          onSubmit={async (
            values: any,
            actions: { setSubmitting: (arg0: boolean) => void }
          ) => {
            console.log(
              "🚀 ~ file: WillForm.tsx:114 ~ WillForm ~ values:",
              values
            );
            if (identifier && willType && assetType) {
              const will = {
                identifier: identifier,
                willName: values.willName,
                willDescription: values.willDescription,
                willType: willType,
                tokenTicker: assetType!,
                amount: values.amount,
                heirs: values.heirs,
              };
              await submitWillForm(will, actions);
            } else {
              toast({
                title: "Error Occured in Creating Will",
                description: JSON.stringify(values),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }
          }}
        >
          {(props: { isSubmitting: any }) => (
            <Form>
              {" "}
              <br />
              <Field name="identifier">
                {({ form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.identifier && form.touched.identifier
                    }
                  >
                    <FormLabel>Will UId</FormLabel>
                    <Box>{identifier}</Box>
                    <FormErrorMessage>
                      {form.errors.identifier}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Field name="willName" validate={validateWllName}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.willName && form.touched.willName}
                  >
                    <FormLabel>Will Name</FormLabel>
                    <Input {...field} placeholder="My Will XYZ" />
                    <FormErrorMessage>{form.errors.willName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Field name="willDescription" validate={validateWllName}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.willDescription &&
                      form.touched.willDescription
                    }
                  >
                    <FormLabel>Will Description</FormLabel>
                    <Input {...field} placeholder="My Will XYZ" />
                    <FormErrorMessage>
                      {form.errors.willDescription}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              <Field name="heirs" validate={validatePrincipal}>
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.heirs && form.touched.heirs}
                  >
                    <FormLabel>Heirs Principal</FormLabel>
                    <Input
                      {...field}
                      placeholder="2fq7c-slacv-26cgz-vzbx2-2jrcs-5edph-i5s2j-tck77-c3rlz-iobzx-mqe"
                    />
                    <FormErrorMessage>{form.errors.heirs}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field as="select" name="willType">
                {({ field, form }: any) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.willType && form.touched.willType}
                  >
                    <FormLabel>Will Type</FormLabel>
                    <Select
                      {...field}
                      onChange={handleWillTypeChange}
                      placeholder="Select option"
                    >
                      <option value="ICRC">ICRC-1</option>
                      {/* <option value="BTC">Bitcoin</option> */}
                    </Select>
                    <FormErrorMessage>{form.errors.willType}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <br />
              {/* {willType === "BTC" && (
                <Field name="lastName">
                  {({ field, form }: any) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.lastName && form.touched.lastName}
                    >
                      <FormLabel>Identifier From BTC</FormLabel>
                      <Box>{identifier}</Box>
                      <FormErrorMessage>
                        {form.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )} */}
              {willType === "ICRC" && (
                <>
                  <br />
                  <Field as="select" name="assetType">
                    {({ field, form }: any) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.assetType && form.touched.assetType
                        }
                      >
                        <FormLabel>Asset</FormLabel>
                        <Select
                          {...field}
                          onChange={handleAssetTypeChange}
                          placeholder="Select option"
                        >
                          <option value="ICP">$ICP</option>
                          <option value="ckBTC">ckBTC</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.assetType}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <br />{" "}
                  <Field name="amount" validate={validateICRCAmount}>
                    {({ field, form }: any) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.amount && form.touched.amount}
                      >
                        <FormLabel>Enter Amount </FormLabel>
                        <Input {...field} placeholder="1.0." />
                        <FormErrorMessage>
                          {form.errors.amount}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </>
              )}
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
                      setIdentifier(null);
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
