/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import PublicNav from "../../components/public-nav";
import { Card, Label, TextInput, Button } from "flowbite-react";
import PublicFooter from "../../components/public-footer";

const ForgotPasswordPage: FC = function () {
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
              Forgot Password?
            </h1>
            <span className="mb-3 text-center text-[#6B7280] ">
              Enter your email address
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

              <div className="my-10">
                <Button type="submit" className="w-full">
                  Send Reset Instructions
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

export default ForgotPasswordPage;
