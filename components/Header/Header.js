import { ChevronDownIcon } from '@heroicons/react/outline';
// import {
//     ArrowCircleLeftIcon,
//     ArrowCircleRightIcon,
// } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { shuffle } from 'lodash';

const colors = [
    'blue-500',
    'indigo-500',
    'purple-500',
    'pink-500',
    'red-500',
    'yellow-500',
    'green-500',
];

const Header = () => {
    const { data: session } = useSession();
    const [color, setColor] = useState(null);

    useEffect(() => {
        setColor(shuffle(colors).shift());
    }, []);

    return (
        <>
            <header className='absolute top-5 right-8'>
                {/* <div className='flex'>
                    <ArrowCircleLeftIcon className='w-8 h-8 cursor-pointer' />
                    <ArrowCircleRightIcon className='w-8 h-8 cursor-pointer' />
                </div> */}
                <div className='flex items-center w-max rounded-full bg-black/80 text-white space-x-2 p-0.5 pr-2 hover:bg-black/60 cursor-pointer'>
                    <img
                        className='rounded-full w-7 h-7'
                        src={session?.user.image}
                        alt=''
                    />
                    <span>{session?.user.name}</span>
                    <ChevronDownIcon className='w-4 h-4' />
                </div>
            </header>
            <div
                className={`flex items-end h-80 space-x-7 text-white p-8 bg-gradient-to-b from-${color} to-black`}
            >
                {/* <img src='' alt='' /> */}
                <h1>Header content</h1>
            </div>
        </>
    );
};

export default Header;
