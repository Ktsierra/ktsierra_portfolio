import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const ServiceCard = ({ index, title, icon }: {
  index: number;
  title: string;
  icon: string;
}) => {
  return (
    <Tilt
      className='xs:w-[250px] w-full'
      scale={1}
      tiltMaxAngleX={22.5}
      tiltMaxAngleY={22.5}
      transitionSpeed={450}
    >
      <motion.div
        variants={fadeIn({ direction: 'right', type: 'spring', delay: 0.5 * index, duration: 0.75 })}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img src={icon} alt={title} className='w-20 h-20 object-contain' />
          <h3 className='text-white text-xl text-center font-bold'>{title}</h3>
        </div>
      </motion.div>

    </Tilt>

  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant({})}>
        <p className={styles.sectionSubText}> Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>
      <motion.p
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
        variants={fadeIn({ direction: 'up', type: 'tween', delay: 0.1, duration: 1 })} >
        I&apos;m a skilled software developer and network engineer with extensive experience in building web and mobile applications. My work primarily involves using TypeScript alongside frameworks like Expo, and I deploy robust solutions via CI/CD pipelines and cloud infrastructure. I am passionate about continuous learning and thrive on collaborating closely with clients to design and develop high-performance, scalable, and intuitive solutions that address real business challenges. Partner with me to turn your vision into reality!
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index)=>(
          <ServiceCard key={service.title} index={index} {...service} />
        ))}

      </div>
    </>


  );
};

const WrappedAbout = SectionWrapper({ children: <About />, idName: 'about' });

export default WrappedAbout;