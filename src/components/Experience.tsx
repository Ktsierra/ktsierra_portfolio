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
    iconStyle={{ background: experience.iconBg, color: '#fff', borderRadius: '50%' }}
    icon={
      <div className='flex justify-center items-center w-full h-full'>
        <img
          src={experience.icon}
          alt={experience.title}
          className='w-2/3 h-2/3 object-contain'
        />
      </div>
    }
  >
    <div>
      <h3 className='text-white text-2xl font-bold'>
        {experience.title}
      </h3>
      <h4 className='text-secondary text-[16px] font-semibold m-0'>
        {experience.company_name}
      </h4>
    </div>

    <ul className='mt-5 list-disc ml-5 space-y-2'>
      {experience.points.map((points, index)=> (
        <li
          key={`experience-point-${index.toString()}`}
          className='text-white text-[14px] pl-1 tracking-wider'
        >
          {points}
        </li>
      )
      )}
    </ul>
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