import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-black'>
            <img
                className='w-24 mb-10'
                src='https://links.papareact.com/9xl'
                alt=''
            />
            {Object.values(providers).map((p) => (
                <div key={p.name}>
                    <button
                        className='flex text-white border rounded-md p-3 hover:bg-gray-800'
                        onClick={() => signIn(p.id, { callbackUrl: '/' })}
                    >
                        <img
                            className='w-6 mr-3'
                            src='https://links.papareact.com/9xl'
                            alt=''
                        />
                        Continue with {p.name}
                    </button>
                </div>
            ))}
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
