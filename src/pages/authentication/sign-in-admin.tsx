/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState, type FC } from "react";
import PublicNav from "../../components/public-nav";
import {
  Card,
  Label,
  TextInput,
  Checkbox,
  Button,
  Spinner,
} from "flowbite-react";
import PublicFooter from "../../components/public-footer";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../components/error";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/features/reducers";
import type { UserState } from "../../types";
import { AuthContext } from "../../hooks/authProvider";
import {
  clearLoginTrigger,
  updateUserData,
} from "../../store/features/userSlice";

const SignIn: FC = function () {
  const { isIdle, userData, loginTrigger }: UserState = useSelector(
    (state: any) => state.user
  );
  const { setAuthenticated, setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>([]);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    isAdmin: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginTrigger) {
      if (isIdle && userData && userData.error) {
        setErrors((oldArray) => [...oldArray, userData.error]);
      } else if (isIdle && userData && userData.user && userData.token) {
        setUser({
          ...userData.user,
          userType: "admin",
          permissions: ["can_view_organization", "can_add_organization"],
        });

        setToken(userData.token);
        setAuthenticated(true);
        localStorage.setItem("token", userData.token);
        dispatch(
          updateUserData({
            ...userData.user,
            userType: "admin",
            permissions: ["can_view_organization", "can_add_organization"],
          })
        );
        gotoPage("organization");
      }
      dispatch(clearLoginTrigger());
    }
  }, [loginTrigger]);

  const gotoPage = (page: string) => {
    navigate(`/${page}`);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const tryLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email.trim() === "" && formData.password.trim() === "") {
      setErrors((oldArray) => [
        ...oldArray,
        "Username and password are required!",
      ]);
    } else {
      dispatch(loginUser(formData));
    }
  };

  return (
    <>
      <div className="bg-[url('/images/Background.png')] bg-cover">
        <PublicNav />
        <div className="flex items-center justify-center pt-32 max-lg:px-10">
          <Card
            horizontal
            imgAlt=""
            className="w-full md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
          >
            <h1 className="text-center text-2xl font-bold dark:text-white md:text-3xl">
              Sign In
            </h1>
            <span className="mb-3 text-center text-[#6B7280] ">
              Enter your email and password to sign in!
            </span>
            <ErrorHandler errors={errors} setErrors={setErrors} />
            <form onSubmit={tryLogin}>
              <div className="mb-4 flex flex-col gap-y-3">
                <Label htmlFor="email">Email*</Label>
                <TextInput
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@domain.com"
                  type="email"
                />
              </div>
              <div className="mb-6 flex flex-col gap-y-3">
                <Label htmlFor="password">Password*</Label>
                <TextInput
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 8 characters"
                  type="password"
                />
              </div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <Checkbox id="rememberMe" name="rememberMe" />
                  <Label htmlFor="rememberMe">Keep me logged in</Label>
                </div>
                <a
                  href="javascript: void(0)"
                  onClick={() => gotoPage("forgot-password")}
                  className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mb-1">
                <Button type="submit" className="w-full">
                  {isIdle ? (
                    `Sign In`
                  ) : (
                    <>
                      <Spinner
                        aria-label="Alternate spinner button example"
                        size="sm"
                        color="success"
                      />
                      <span className="pl-3">Sign In</span>
                    </>
                  )}
                </Button>
              </div>

              <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-300">
                Not registered yet?&nbsp;
                <a
                  href="javascript: void(0)"
                  onClick={() => gotoPage("signup")}
                  className="text-primary-600 dark:text-primary-300"
                >
                  Create an account
                </a>
              </p>
            </form>
          </Card>
        </div>
        <PublicFooter />
      </div>
    </>
  );
};

export default SignIn;
