import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { FC, ReactNode } from "react";

interface PublicWrapperProps {
    children: ReactNode;
    fullScreen?: boolean;
}

export const PublicWrapper: FC<PublicWrapperProps> = ({ children, fullScreen = false }) => {
    const navigate = useNavigate();
    const navItems = [
        { label: "Home", href: "#" },
        { label: "Proprly", href: "#" },
        { label: "Contact Us", href: "#" },
    ];

    if (fullScreen) {
        return <>{children}</>;
    }

    return (
        <div className="bg-white flex flex-row justify-center w-full min-h-screen">
            <div className="relative w-full">
                {/* Background Image */}
                <div className="bg-[url(../images/Background.png)] bg-cover bg-center h-full">
                    {/* Header/Navigation */}
                    <header className="flex items-center justify-between px-10 py-10">
                        <img
                            className="h-10 object-cover"
                            alt="Proprly Logo"
                            src="../images/logo.png"
                        />

                        <div className="flex items-center gap-8">
                            <NavigationMenu>
                                <NavigationMenuList className="flex gap-8 ">
                                    {navItems.map((item) => (
                                        <NavigationMenuItem key={item.label}>
                                            <a
                                                href={item.href}
                                                className="text-sm font-medium text-white"
                                            >
                                                {item.label}
                                            </a>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>

                            <Button
                                className="bg-[#1a56db] text-white flex items-center gap-2"
                                size="sm"
                                onClick={() => {
                                    navigate("/sign-in")
                                }}
                            >
                                Login
                                <LogInIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </header>
                    <div className="p-10">
                        {children}
                    </div>

                    {/* Footer */}
                    <footer className="absolute bottom-6 w-full text-center">
                        <p className="text-xs font-leading-none-text-xs-font-medium text-white">
                            {/* © 2024 Proprly. All Rights Reserved. */}
                        </p>
                    </footer>

                </div>
            </div>
        </div>
    );
};