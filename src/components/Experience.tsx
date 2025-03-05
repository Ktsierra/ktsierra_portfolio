import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { experiences } from '../constants';
import { styles } from '../styles';
import SectionWrapper from '../hoc/SectionWrapper';
import { textVariant } from '../utils/motion';

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant({})}>
        <p className={styles.sectionSubText}> What have I done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>

        </VerticalTimeline>
      </div>
    </>

  );
};

const WrappedExperience = SectionWrapper({ children: <Experience />, idName: 'experience' });

export default WrappedExperience;