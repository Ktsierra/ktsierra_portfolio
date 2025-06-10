import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import SectionWrapper from '../hoc/SectionWrapper';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({ name, description, tags, image, source_code_link, app_link, app_icon, index }: {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string | undefined;
  app_link: string | undefined;
  app_icon: string | undefined;
  index: number;
}) => {
  return (
    <motion.div variants={fadeIn({ direction: 'up', type: 'spring', delay: index * 0.5, duration: 0.75 })}>
      <Tilt
        scale={1}
        transitionSpeed={450}
        tiltMaxAngleX={22.5}
        tiltMaxAngleY={22.5}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover rounded-2xl'
          />


          <div className='absolute inset-0 flex justify-end m-3 card-img-hover'>
            { source_code_link && (
              <div
                onClick={() => window.open(source_code_link)}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={github}
                  alt='github'
                  className='w-3/4 h-3/4 object-contain'
                />
              </div>
            )}
            { app_link && (
              <div
                onClick={() => window.open(app_link)}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={app_icon}
                  alt='github'
                  className='w-3/4 h-3/4 object-contain'
                />
              </div>
            )}
          </div>

        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag)=> (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

      </Tilt>
    </motion.div>
  );
};


const Works = () => {
  return (
    <>
      <motion.div variants={textVariant({})}>
        <p className={styles.sectionSubText}> My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className='w-ful flex'>
        <motion.p
          variants={fadeIn({ direction : undefined, type: undefined, delay: 0.1, duration : 1 })}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          The following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described to highlight the challenges addressed, technologies utilized, and outcomes achieved. This portfolio demonstrates my ability to solve complex problems, adapt to various technological environments, and manage projects effectively, even when the underlying code and implementations remain proprietary.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index.toString()}`}
            {...project}
            index={index} />
        ))}
      </div>

    </>
  );
};

const WrappedWorks = SectionWrapper({ children: <Works />, idName: 'work' });

export default WrappedWorks;