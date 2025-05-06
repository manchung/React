import CoreConcept from "./CoreConcept";
import Section from "./Section.jsx";
import {CORE_CONCEPTS} from "../data.js";

export default function CoreConcepts() {
  return (
    <Section id="core-concepts" title="Core Concepts">
      <ul>
        {CORE_CONCEPTS.map((props) => (
          <CoreConcept {...props} key={props.title} />
        ))}
      </ul>
    </Section>
  );
}
