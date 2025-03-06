import { motion } from 'framer-motion';
import { experiences } from '../constants';
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';
import { textVariant } from '../utils/motion';
import { VerticalTimeline, VerticalTimelineElement } from './verticalTimeline';

const ExperienceCard = ({ experience } : {experience: {

    title: string;
    company_name: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];

}} ) => (
  <VerticalTimelineElement
    contentStyle={{ background: '#1d1836', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #1d1836' }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg, color: '#fff' }}
    icon={
      <div>
        <img
          src={experience.icon}
          alt={experience.title}
          className='w-[60%] h-[60%] object-contain'
        />
      </div>
    }
  >
    <div>
      <h3 className='text-white text-2xl font-bold'>
        {experience.title}
      </h3>
    </div>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant({})}>
        <p className={styles.sectionSubText}> What have I done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>

  );
};

const WrappedExperience = SectionWrapper({ children: <Experience />, idName: 'experience' });

export default WrappedExperience;