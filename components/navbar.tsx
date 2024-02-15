"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { navelements } from "@/lib/nav-data";
import { shapeelements } from "@/lib/nav-data";
import { useElementStore } from "@/hooks/element";

const Navbar = () => {
    const { setTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false);
    const { element, setElement } = useElementStore();

    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 10 ? setIsScrolled(true) : setIsScrolled(false);
        };

        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);
    return (
        <header className={`fixed z-40 top-0 bg-white dark:bg-black ${isScrolled ? 'shadow-md' : ''} py-3 w-screen`}>
            <div className='mx-auto px-8 flex justify-between items-center'>
                <Link href={'/'}>
                    <Image
                        src={"/logo.png"}
                        alt="Palleon Logo"
                        width={"100"}
                        height={"100"}
                    />
                </Link>
                <div className='hidden md:flex items-center gap-5'>
                    {
                        navelements.map((data, key) => (
                            data.value !== "rectangle" ?
                                <Button
                                    className={`${element === data.value ? 'border-blue-500' : ''} ${data.value === 'delete' ? 'text-red-500' : ''}`}
                                    onClick={() => setElement(data.value)}
                                    key={key}
                                    variant={"outline"}
                                >
                                    <data.icon className="w-5 h-5" />
                                </Button>
                                : <Popover key={key}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                        >
                                            <data.icon className="w-5 h-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="flex flex-col gap-2 w-20">
                                        {
                                            shapeelements.map((shape, key) => (
                                                <Button
                                                    className={`${element === shape.value ? 'border-blue-500' : ''}`}
                                                    onClick={() => setElement(shape.value)}
                                                    key={key}
                                                    variant={"outline"}
                                                >
                                                    <shape.icon className="w-7 h-7" />
                                                </Button>
                                            ))
                                        }
                                    </PopoverContent>
                                </Popover>
                        ))
                    }
                </div>
                <div className="hidden md:flex items-center gap-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default Navbar