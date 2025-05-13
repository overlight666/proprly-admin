
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { MasterAccordion } from "./components/accordion";

export default function MasterConfiguration() {
    return (
        <NavbarSidebarLayout>
            <main className="flex flex-col w-full gap-[22px] pb-5 px-5">
                <section className="flex flex-col gap-6 pt-6 rounded-t-lg">
                    <header className="flex items-center w-full">
                        <h1 className="text-[24px] font-bold text-[#111928] dark:text-gray-100 leading-[24px]">
                            Master Configuration
                        </h1>
                    </header>
                </section>

                {/* Organization Card */}
                <MasterAccordion />
            </main>
        </NavbarSidebarLayout>

    );
}
