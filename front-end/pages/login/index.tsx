import Head from 'next/head';
import UserLoginForm from '@components/users/UserLoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Login = () => (
    <>
        <Head>
            <title>Login</title>
        </Head>
        <main className="flex justify-center items-center min-h-screen bg-gray-50">
            <UserLoginForm />
        </main>
    </>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default Login;
