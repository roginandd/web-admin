export const formatFullname = (
  firstName: string,
  middleName: string,
  lastName: string
) => {
  const fullname: string = `${firstName} ${middleName && ""} ${lastName}`;

  return fullname;
};

export const VerificationInfoStatusText: Record<number, string> = {
  0: "Pending",
  1: "Approved",
  2: "Rejected",
};
