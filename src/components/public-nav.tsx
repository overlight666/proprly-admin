import { Navbar, Button } from "flowbite-react";
import type { FC } from "react";
import { HiOutlineLogin } from "react-icons/hi";

const PublicNav: FC = function () {
  return (
    <Navbar fluid className="bg-transparent p-6">
      <div className="flex items-center gap-x-9">
        <Navbar.Brand href="/">
          <img alt="" src="/images/proprly.png" className="mr-3 h-6 sm:h-9" />
        </Navbar.Brand>
      </div>
      <div className="flex items-center gap-x-9">
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">Proprly</Navbar.Link>
          <Navbar.Link href="#">Contact Us</Navbar.Link>
        </Navbar.Collapse>
        <Button>
          Login <HiOutlineLogin className="ml-3 text-lg" />
        </Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default PublicNav;
