import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <img
                className="w-60 mb-2"
                src="https://logos-world.net/wp-content/uploads/2020/09/Spotify-Logo.png"
                alt=""
            />
            {Object.values(providers).map((p) => (
                <div key={p.name}>
                    <button
                        className="flex items-center text-black text-sm tracking-wider uppercase font-bold rounded-full h-12 px-10 bg-[#1ED760] hover:bg-opacity-90"
                        onClick={() => signIn(p.id, { callbackUrl: '/' })}
                    >
                        Sign in with {p.name}
                    </button>
                </div>
            ))}
            <p className="text-white/50 mt-8 w-80 text-center">
                To sign in to this application, you will need to gain access
                permission from the developer.
            </p>
        </div>
    );
};

export default Login;

export const getServerSideProps = async () => {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
};
