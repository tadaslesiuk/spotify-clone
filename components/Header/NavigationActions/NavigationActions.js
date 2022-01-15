import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
} from '@heroicons/react/solid';

const NavigationActions = () => {
    return (
        <div className="flex space-x-2">
            <ArrowCircleLeftIcon className="w-10 h-10 opacity-80 cursor-not-allowed" />
            <ArrowCircleRightIcon className="w-10 h-10 opacity-40 cursor-not-allowed" />
        </div>
    );
};

export default NavigationActions;
