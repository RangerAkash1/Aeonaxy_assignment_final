// import "./Aboutyou.css";

// const AboutYou = ({ handlePrevious, setQue, que, handleSubmit }) => {
//   const handleOptionChange = (event) => {
//     setQue(event.target.value);
//   };

//   return (
//     <div>
//       <div className="about-you">
//         <label>What are you here for?</label>
//         <select value={que} onChange={handleOptionChange}>
//           <option value="">Select...</option>
//           <option value="I'm a designer looking to share my work">
//             I'm a designer looking to share my work
//           </option>
//           <option value="I'm looking to hire a designer">
//             I'm looking to hire a designer
//           </option>
//           <option value="I'm looking for design inspiration">
//             I'm looking for design inspiration
//           </option>
//         </select>
//       </div>
//       <button className="srevious-button" onClick={handlePrevious}>
//         Previous
//       </button>

//       <button className="submit-button" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AboutYou;

import { useState } from "react";
import "./Aboutyou.css";

const AboutYou = ({ handlePrevious, handleSubmit, setQue, que }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const opts = {
    shareWork: {
      id: 1,
      text: "I'm a designer looking to share my work",
      img_link:
        "https://yt3.googleusercontent.com/ytc/AIdro_nfSKDQfhcfz8CXoQhhOeCKSpuEuauHugKcjylmvN744w=s176-c-k-c0x00ffffff-no-rj",
    },
    hireDesigner: {
      id: 2,
      text: "I'm looking to hire a designer",
      img_link:
        "https://assets.dreamjobs.lk/images/content/20170401/qsDds2QxerxoLk6.jpg",
    },
    inspiration: {
      id: 3,
      text: "I'm looking for design inspiration",
      img_link:
        "https://korywoodard.com/wp-content/uploads/2017/11/11.6_DesignInspiration.png",
    },
  };

  const handleWidgetSelect = (option) => {
    setSelectedOption(option);
    setQue(opts[option].text);
  };

  const Widget = ({ text, selected, option }) => {
    return (
      <div
        className={`widget ${selected ? "selected" : ""}`}
        onClick={() => handleWidgetSelect(option)}
      >
        <img src={opts[option].img_link} alt="dribbble-logo" />
        <p className="widget-text">{opts[option].text}</p>
      </div>
    );
  };

  return (
    <div className="about-you-container">
      <h1 className="about-you-heading">What brings you to Dribbble?</h1>
      <p className="about-you-description">
        Select the option that best describes you. Don't worry, you can explore
        other options later.
      </p>
      <div className="widget-container">
        {Object.keys(opts).map((key) => (
          <Widget
            key={key}
            text={opts[key].text}
            selected={selectedOption === key}
            option={key}
          />
        ))}
      </div>

      <div className="button-container">
        <button className="previous-button" onClick={handlePrevious}>
          Previous
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AboutYou;
