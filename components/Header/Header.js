import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
} from '@heroicons/react/solid';

const Header = () => {
    const { data: session } = useSession();

    return (
        <>
            <header className="fixed flex justify-between py-3 px-7 left-0 right-0 sm:left-0 md:left-[12rem] lg:left-[15rem]">
                <div className="flex space-x-2">
                    <ArrowCircleLeftIcon className="w-10 h-10 opacity-80 cursor-pointer" />
                    <ArrowCircleRightIcon className="w-10 h-10 opacity-40 cursor-pointer" />
                </div>
                <div
                    className="flex items-center w-max h-max rounded-full bg-black/60 text-white space-x-2 p-0.5 pr-2 hover:bg-black/60 cursor-pointer"
                    onClick={() => signOut()}
                >
                    <img
                        className="rounded-full w-7 h-7"
                        src={session?.user.image}
                        alt=""
                    />
                    <span className="text-sm font-bold">
                        {session?.user.name}
                    </span>
                    <ChevronDownIcon className="w-4 h-4" />
                </div>
            </header>
        </>
    );
};

export default Header;
