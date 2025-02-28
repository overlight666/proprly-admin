import { atom } from "recoil";
import { ResentType, SignUpLeadResponseType, VerifyType } from "../../_types";

const signupLeadsAtom = atom<SignUpLeadResponseType>({
  key: "signupLeads",
  default: undefined,
});

const verifyResultAtom = atom<VerifyType>({
  key: "verifyResult",
  default: undefined,
});

const resentOtpAtom = atom<ResentType>({
  key: "resentOtp",
  default: undefined,
});

export { signupLeadsAtom, verifyResultAtom, resentOtpAtom };
