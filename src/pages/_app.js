import { Montserrat } from 'next/font/google';
import '@/styles/globals.css';

const montserratFont = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={montserratFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
