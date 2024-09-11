import { Footer } from "flowbite-react";
import type { FC } from "react";

const PublicFooter: FC = function () {
  return (
    <Footer className="!justify-center rounded-none !bg-transparent pb-10 lg:pt-16">
      {/* <div className="flex w-[95%] flex-col justify-center"> */}
      {/* <div className="w-full px-4 pb-24 sm:flex sm:items-center sm:justify-center"> */}
      <Footer.Copyright
        by="Proprly. All Rights Reserved."
        href="#"
        year={2024}
      />
      {/* </div> */}
      {/* </div> */}
    </Footer>
  );
};

export default PublicFooter;
