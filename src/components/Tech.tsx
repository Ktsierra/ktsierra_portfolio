import { BallCanvas } from "./canvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { technologies } from "../constants";

const Tech = () => {


  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((tech)=> (
        <div
          className="w-28 h-28 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
          key={tech.name}
          onClick={() => window.open(tech.link)}
        >
          <BallCanvas {...tech} />
        </div>

      ))}

    </div>
  );
};


const WrappedTech = SectionWrapper({ children: <Tech />, idName: 'tech' });

export default WrappedTech;