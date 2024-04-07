import React from 'react';
// import TiltImage from './tilt_image'; // Adjust the path as necessary
import Tilt from 'react-parallax-tilt';

interface TwoColSecProps {
    description: string,
    title: string
}

const TwoColumnSectionRightImg = ({ description, title }: TwoColSecProps) => {
  return (
    <div className="container mx-auto px-4 mt-[200px]">
      <div className="flex flex-wrap -mx-4">

        {/* Right Column for the Text */}
        <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
          <div className="text-box">
            {/* Your text content goes here */}
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg z-5">
              {description}
            </p>
            <div className="z-0 absolute left-1/4 transform -translate-x-1/3 -translate-y-2/3 w-[700px] h-20 bg-gradient-to-r from-customDarkBlue to-customLightBlue blur-3xl rounded-full"></div>
            {/* Add more content as needed */}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 flex justify-center items-center">
          <Tilt className="parallax-effect-glare-scale mt-5 rounded-md drop-shadow-2xl" style={{ height: '300px', backgroundColor: 'darkgrey' }} glareEnable={true} glareMaxOpacity={0.45} scale={1.02} tiltAngleYInitial={20} tiltEnable={true}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                <img className='drop-shadow-2xl hidden dark:block rounded-md' src="horiz_chat_with_ai_dark.jpeg" alt="tilt-img" />
                <img className='drop-shadow-2xl dark:hidden rounded-md' src="horiz_chat_with_ai_light.jpeg" alt="tilt-img" />
            </div>
            </Tilt>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnSectionRightImg;