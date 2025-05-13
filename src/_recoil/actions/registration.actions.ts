/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState } from "recoil";

import { useFetchWrapper } from "@/helpers";
import { resentOtpAtom, signupLeadsAtom, verifyResultAtom } from "@/_recoil/states";
import { OTPType, SignUpLeadPayloadType } from "@/lib/interface";
import { toast } from "react-toastify";

export { useRegistration };

function useRegistration() {
  const baseUrl = `${import.meta.env["VITE_API_URL"]}`;
  const fetchWrapper: any = useFetchWrapper();
  const setSignupLeads = useSetRecoilState(signupLeadsAtom);
  const setVerifyResult = useSetRecoilState(verifyResultAtom);
  const setResentResult = useSetRecoilState(resentOtpAtom);

  return {
    registerLead,
    verifyOtp,
    resendOTP,
  };

  function registerLead(params: SignUpLeadPayloadType) {
    return fetchWrapper
      .post(`${baseUrl}/signup-leads`, params)
      .then((response: any) => {
        if (response) {
          setSignupLeads(response && response.data ? response.data : response);
          return response && response.data ? response.data : response
        }
      }).catch((e: any) => {
        if (e?.messages) {
          if (e?.messages?.length > 0) {
            e?.messages?.map((m: any) => {
              return toast.error(m?.message);
            });
          } else {
            toast.error(e);
          }
        } else {
          if (e) {
            toast.error(e);
          } else {
            toast.error("Unknown error, please contact admin");
          }
        }
      });
  }

  function verifyOtp(params: OTPType, leadId: number) {
    return fetchWrapper
      .post(`${baseUrl}/signup-leads/${leadId}/verify/mobile-number`, params)
      .then((response: any) => {
        if (response) {
          setVerifyResult(response && response.data ? response.data : response);
          return response && response.data ? response.data : response
        }
      }).catch((e: any) => {
        if (e?.messages) {
          if (e?.messages?.length > 0) {
            e?.messages?.map((m: any) => {
              return toast.error(m?.message);
            });
          } else {
            toast.error(e);
          }
        } else {
          if (e) {
            toast.error(e);
          } else {
            toast.error("Unknown error, please contact admin");
          }
        }
      });
  }

  function resendOTP(leadId: number) {
    return fetchWrapper
      .post(`${baseUrl}/signup-leads/${leadId}/resend/mobile-number`)
      .then((response: any) => {
        if (response) {
          setResentResult(response && response.data ? response.data : response);
          return response && response.data ? response.data : response
        }
      }).catch((e: any) => {
        if (e?.messages) {
          if (e?.messages?.length > 0) {
            e?.messages?.map((m: any) => {
              return toast.error(m?.message);
            });
          } else {
            toast.error(e);
          }
        } else {
          if (e) {
            toast.error(e);
          } else {
            toast.error("Unknown error, please contact admin");
          }
        }
      });
  }
}
