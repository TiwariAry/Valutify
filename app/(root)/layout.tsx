// This is the main layout for this branch -> Specific UI you can across multiple pages
// Everything here will be displayed in all the other pages inside this branch

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = { firstName: 'Aryan', lastname: 'Tiwari' };

    return (
        <main className={"flex h-screen w-full font-inter"}>
            {/* This is the left sidebar*/}

            {/*This is for big screen*/}
            <Sidebar user={loggedIn}/>
            {/*This is for mobile screen*/}
            <div className={"flex size-full flex-col"}>
                <div className={"root-layout"}>
                    <Image src={"/icons/logo.png"} width={30} height={30} alt={"Menu Icon"}/>
                    <div>
                        <MobileNav user={loggedIn}/>
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
