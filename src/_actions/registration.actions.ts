/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "../_helpers";
import { resentOtpAtom, signupLeadsAtom, verifyResultAtom } from "../_state";
import { OTPType, SignUpLeadPayloadType } from "../_types";

export { useRegistration };

function useRegistration() {
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const fetchWrapper: any = useFetchWrapper();
  const setSignupLeads = useSetRecoilState(signupLeadsAtom);
  const setVerifyResult = useSetRecoilState(verifyResultAtom);
  const setResentResult = useSetRecoilState(resentOtpAtom);

  return {
    registerLead,
    verifyOtp,
    resendOTP,
  };

  function registerLead(params: SignUpLeadPayloadType, setStep: any) {
    return fetchWrapper
      .post(`${baseUrl}/signup-leads`, params)
      .then((response: any) => {
        if (response) {
          setSignupLeads(response && response.data ? response.data : response);
          setStep(3);
        }
      });
  }

  function verifyOtp(params: OTPType, leadId: number) {
    return fetchWrapper
      .post(`${baseUrl}/signup-leads/${leadId}/verify/mobile-number`, params)
      .then((response: any) => {
        if (response) {
          setVerifyResult(response && response.data ? response.data : response);
        }
      });
  }

  function resendOTP(leadId: number) {
    return fetchWrapper
      .post(`${baseUrl}/signup-leads/${leadId}/resend/mobile-number`)
      .then((response: any) => {
        if (response) {
          setResentResult(response && response.data ? response.data : response);
        }
      });
  }
}
