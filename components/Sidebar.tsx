// This is the left sidebar

// We have to convert this file to a 'client side component' because we have used a hook 'usePathname'
'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Footer from "@/components/Footer";

const Sidebar = ({user} : SiderbarProps) => {
    const pathname = usePathname();

    return (
        <section className={"sidebar"}>
            <nav className={"flex flex-col gap-4"}>
                {/*NextJS Link*/}
                <Link href={'/'} className={"flex mb-12 cursor-pointer items-center gap-2"}>
                    {/*NextJS Image*/}
                    <Image
                        src={"/icons/logo.png"}
                        width={34}
                        height={34}
                        alt={"Horizon logo"}
                        className={"size-[24px] max-xl:size-14"}
                    />
                    <h1 className={"sidebar-logo"}>
                        Horizon
                    </h1>
                </Link>

                {/* cn(Class names) -> Used to make a link active or deactive */}
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                    return (
                        <Link href={item.route} key={item.label} className={cn('sidebar-link', {
                            'bg-bank-gradient' : isActive
                        })}>
                            <div className={"relative size-6"}>
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({
                                        'brightness-[3] invert-0': isActive
                                    })}
                                />
                            </div>
                            <p className={cn('sidebar-label', {
                                '!text-white': isActive
                            })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
            USER
            </nav>

            <Footer user={user}>

            </Footer>
        </section>
    )
}
export default Sidebar
