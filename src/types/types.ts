import type { Role, VerificationInfoStatus } from "../enum/enums";

export type Role = (typeof Role)[keyof typeof Role];

export type VerificationInfoStatus =
  (typeof VerificationInfoStatus)[keyof typeof VerificationInfoStatus];
