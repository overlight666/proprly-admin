/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, type FC } from "react";
import PublicNav from "../../components/public-nav";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import PublicFooter from "../../components/public-footer";
import { useNavigate } from "react-router-dom";

const SignIn: FC = function () {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>([]);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
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

  const removeError = (index) => {
    setErrors((prevState) => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ]);
  };

  const tryLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      gotoPage("organization");
    } else {
      setErrors((oldArray) => [...oldArray, "Email or password is incorrect!"]);
    }
  };

  return (
    <>
      <div className="bg-[url('/images/Background.png')]">
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
            {errors.length > 0 &&
              errors.map((e, index) => {
                return (
                  <span
                    key={index}
                    id="badge-dismiss-red"
                    className="me-2 inline-flex items-center justify-between rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                  >
                    {e}
                    <button
                      type="button"
                      className="ms-2 inline-flex items-center justify-center  rounded-sm bg-transparent p-1 text-sm text-red-400 hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
                      data-dismiss-target="#badge-dismiss-red"
                      aria-label="Remove"
                      onClick={() => removeError(index)}
                    >
                      <svg
                        className="h-2 w-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </span>
                );
              })}
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
                  Sign In
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
