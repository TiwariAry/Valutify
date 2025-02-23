'use client'

import React from 'react'
import Image from "next/image";

// Shadecn Sheet imports
import {
    Sheet, SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";


const MobileNav = ({user}: MobileNavProps) => {
    const pathname = usePathname();

    // We will use Sheet by shadcn
    return (
        <section className={"w-full max-w-[264px]"}>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={"/icons/hamburger.svg"}
                        width={30}
                        height={30}
                        alt={"Menu"}
                        className={"cursor-pointer"}
                    />
                </SheetTrigger>
                <SheetContent side={"left"} className={"border-none bg-white"}>
                    <SheetTitle></SheetTitle>
                    {/*NextJS Link*/}
                    <Link href={'/'} className={"flex cursor-pointer items-center gap-1 px-4"}>
                        {/*NextJS Image*/}
                        <Image
                            src={"/icons/logo.png"}
                            width={34}
                            height={34}
                            alt={"Horizon logo"}
                        />
                        <h1 className={"text-26 font-ibm-plex-serif font-bold text-black-1"}>
                            Horizon
                        </h1>
                    </Link>

                    <div className={"mobilenav-sheet"}>
                        {/*We are using SheetClose so that if the use click anywhere on the navbar besides the buttons, it closes the navbar*/}
                        <SheetClose asChild>
                            <nav className={"flex h-full flex-col gap-6 pt-16 text-white"}>
                                {/* cn(Class names) -> Used to make a link active or deactive */}
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} key={item.label} className={cn('mobilenav-sheet_close w-full', {
                                                'bg-bank-gradient': isActive
                                            })}>
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({
                                                        'brightness-[3] invert-0': isActive
                                                    })}
                                                />
                                                <p className={cn('text-16 font-semibold text-black-2', {
                                                    'text-white': isActive
                                                })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            USER
                            </nav>
                        </SheetClose>
                    FOOTER
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}
export default MobileNav
