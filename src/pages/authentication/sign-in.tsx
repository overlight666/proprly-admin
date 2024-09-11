/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import PublicNav from "../../components/public-nav";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import PublicFooter from "../../components/public-footer";

const SignIn: FC = function () {
  return (
    <>
      <div className="bg-[url('/images/Background.png')]">
        <PublicNav />
        <div className="flex items-center justify-center pt-32 max-lg:px-10">
          <Card
            horizontal
            imgAlt=""
            className="w-full md:max-h-[500px] md:max-w-[500px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
          >
            <h1 className="text-center text-2xl font-bold dark:text-white md:text-3xl">
              Sign In
            </h1>
            <span className="mb-3 text-center text-[#6B7280] ">
              Enter your email and password to sign in!
            </span>
            <form>
              <div className="mb-4 flex flex-col gap-y-3">
                <Label htmlFor="email">Email*</Label>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="email@domain.com"
                  type="email"
                />
              </div>
              <div className="mb-6 flex flex-col gap-y-3">
                <Label htmlFor="password">Password*</Label>
                <TextInput
                  id="password"
                  name="password"
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
                  href="#"
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
                <a href="#" className="text-primary-600 dark:text-primary-300">
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
