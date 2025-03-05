import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>

      {/* Hero content */}
      <div className={`${styles.paddingX}, absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 ease-in-out duration-300`}>
        <div className='flex flex-col justify-center items-center mt-5 ease-in-out duration-300'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient ease-in-out duration-300' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText}, text-white ease-in-out duration-300`}> Hi, I&apos;m &nbsp;
            <span className='text-[#915eff]'>
              Jose Sierra
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white ease-in-out duration-300`}>
            I develop mobile and web&nbsp;
            <br className='sm:block hidden' />
            applications.
          </p>
        </div>
      </div>

      {/* Computers canvas */}
      <ComputersCanvas />

      {/* Scroll down */}
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2' >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className='w-4 h-4 rounded-full bg-secondary mb-1' />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;