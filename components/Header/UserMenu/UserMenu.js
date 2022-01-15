import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ExternalLinkIcon,
} from '@heroicons/react/outline';

const UserMenu = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
        <div>
            <div
                className="flex items-center w-max h-max rounded-full bg-black/60 text-white space-x-2 p-0.5 pr-2 hover:bg-black/60 cursor-pointer"
                onClick={toggleOpen}
            >
                <img
                    className="rounded-full w-7 h-7"
                    src={session?.user.image}
                    alt=""
                />
                <span className="text-sm font-bold">{session?.user.name}</span>
                {open ? (
                    <ChevronUpIcon className="w-4 h-4" />
                ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                )}
            </div>
            {open && (
                <div class="absolute right-7 mt-2 p-1 w-44 bg-[#282828] text-white rounded shadow-xl z-20">
                    <div class="flex justify-between items-center p-2.5 text-sm hover:bg-white/10 rounded-sm select-none cursor-not-allowed">
                        <p>Account</p>
                        <ExternalLinkIcon className="w-4 h-4" />
                    </div>
                    <div class="flex justify-between items-center p-2.5 text-sm hover:bg-white/10 rounded-sm select-none cursor-not-allowed">
                        <p>Profile</p>
                    </div>
                    <div
                        class="flex justify-between items-center p-2.5 text-sm hover:bg-white/10 rounded-sm select-none"
                        onClick={() => signOut()}
                    >
                        <p>Log out</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
