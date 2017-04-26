import React from 'react';
import classNames from 'classnames';
import Banner from '../components/Banner.jsx';
import Audience from '../components/Audience.jsx';
import VisionStory from '../components/VisionStory.jsx';
import Vision from '../components/Vision.jsx';
import WhyWeDo from '../components/WhyWeDo.jsx';
import NewsCTA from '../components/NewsCTA.jsx';
import FontSpace from '../components/FontSpace.jsx';

function Home() {
  $('.parallax').parallax();
  return (
    <div>
      <Banner />
      <Audience />
      <Vision />
      <WhyWeDo />
    </div>
  );
}

export default Home;
