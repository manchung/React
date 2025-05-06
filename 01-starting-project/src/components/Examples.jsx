import {useState} from "react";
import {EXAMPLES} from "../data.js";
import TabButton from "./TabButton.jsx";
import Tabs from "./Tabs.jsx"; 
import Section from "./Section.jsx";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function onClick(topic) {
    // console.log(`${component} Clicked!`);
    setSelectedTopic(topic);
  }

  let tabContent = <p>Please select a topic</p>;
  if (selectedTopic) {
    let {title, description, code} = EXAMPLES[selectedTopic];
    tabContent = (
      <div id="tab-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  const tabButtons = (
    <>
      {Object.keys(EXAMPLES).map((topic) => (
        <TabButton
          key={topic}
          isSelected={selectedTopic === topic}
          onClick={() => onClick(topic)}
        >
          {EXAMPLES[topic].title}
        </TabButton>
      ))}
    </>
  );

  return (
    <Section id="examples" title="Examples">
      <Tabs buttons={tabButtons} >{tabContent}</Tabs>
    </Section>
  );
}