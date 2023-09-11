export const showToast = (
  toast: (arg0: {
    title: any;
    description: any;
    status: any;
    duration: number;
    isClosable: boolean;
  }) => void,
  title: string,
  description: string,
  status: string
) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
  });
};

export const showTopToast = (
  toast: (arg0: {
    title: any;
    description: any;
    status: any;
    duration: number;
    isClosable: boolean;
    position: string;
  }) => void,
  title: any,
  description: any,
  status: any
) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
    position: "top",
  });
};

export const showMediumToast = (
  toast: (arg0: {
    title: any;
    description: any;
    status: any;
    duration: number;
    isClosable: boolean;
  }) => void,
  title: any,
  description: any,
  status: any
) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 20000,
    isClosable: true,
  });
};

export const showLongToast = (
  toast: (arg0: {
    title: any;
    description: any;
    status: any;
    duration: number;
    isClosable: boolean;
  }) => void,
  title: any,
  description: any,
  status: any
) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 40000,
    isClosable: true,
  });
};

export const showStandardErrorMesg = (toast: any) => {
  showToast(
    toast,
    "🤖 We have a problem.",
    "Something is not working. 😭 Please try again later or contact us support@beamfi.app for help. 👨‍💻",
    "error"
  );
};
