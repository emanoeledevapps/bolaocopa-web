import Image from 'next/image';
import PreviewImg from '../assets/app-preview.png';
import Logo from '../assets/logoby.png';
import GooglePlay from '../assets/google_play.png'
import AvataresImg from '../assets/avatares.png';
import IconCheckImg from '../assets/icon-check.svg';
import { api } from '../services/api';
import { FormEvent, useState } from 'react';

interface HomeProps{
    poolsCount: number;
    guessesCount: Number;
    usersCount: Number;
}

export default function Home(props: HomeProps) {
    const [poolTitle, setPoolTitle] = useState('');

    return (
        <div className='flex flex-col items-center justify-center h-auto md:flex-row md:h-screen'>
            <main className='w-[400px]'>
                <Image 
                    src={Logo} alt='Logo NLW copa' 
                    className='mb-10 w-[200px]'
                />

                <h1 className='font-bold text-white text-4xl mb-10 leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

                <div className='flex items-center mb-5'>
                    <Image src={AvataresImg} alt=''/>

                    <div className='flex items-center gap-1'>
                        <p className='text-green-600 font-extrabold'>+{String(props.usersCount)}</p>
                        <p className='text-white font-bold'> pessoas já estão usando!</p>
                    </div>
                </div>

                <a href="https://play.google.com/store/apps/details?id=com.emanoeledevapps.bolaocopa" target="_blank">
                    <Image
                        src={GooglePlay}
                        alt='Link para o app na google play'
                        className='w-[250px] h-[80px]'
                    />
                </a>

                <p className='text-gray-300 mb-5 mt-5'>
                    Baixe agora mesmo e comece a se divertir! 🚀
                </p>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-white'>
                        <Image src={IconCheckImg} alt=''/>
                        <div>
                            <strong className='font-bold text-xl'>+ {props.poolsCount}</strong>
                            <p className='text-sm'>Bolões criados</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-white'>
                        <Image src={IconCheckImg} alt=''/>
                        <div>
                            <strong className='font-bold text-xl'>+ {String(props.guessesCount)}</strong>
                            <p className='text-sm'>Palpites enviados</p>
                        </div>
                    </div>
                </div>
            </main>

            <Image 
                className='w-[518px] h-[605px]'
                src={PreviewImg} 
                alt='' 
                quality={100}
            />
        </div>
    )
}

export const getServerSideProps = async () => {
    const [poolsCount, guessesCount, usersCount] = await Promise.all([
        api.get('/pools/count'),
        api.get('/guesses/count'),
        api.get('/users/count'),
    ])

    return{
        props:{
            poolsCount: poolsCount.data.count,
            guessesCount: guessesCount.data.count,
            usersCount: usersCount.data.count
        }
    }
}