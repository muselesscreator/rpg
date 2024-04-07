import Gem from './Gem';
import Value from './Value';
import Variable from './Variable';
import {
  gems,
  values,
  gemTypes,
  variables,
} from './data';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const unlockedGems = {
  [gemTypes.value]: [
    gems[gemTypes.value].let,
    gems[gemTypes.value].const,
    gems[gemTypes.value].end,
    gems[gemTypes.value].assign,
    gems[gemTypes.value].add,
    gems[gemTypes.value].subtract,
    gems[gemTypes.value].addAssign,
  ],
  [gemTypes.comparison]: [
    gems[gemTypes.comparison].lessThan,
    gems[gemTypes.comparison].greaterThan,
    gems[gemTypes.comparison].equal,
  ],
  [gemTypes.control]: [
    gems[gemTypes.control].if,
    gems[gemTypes.control].ifElse,
  ],
};

const EditorToolbox = () => {
  return (
    <div className="column editor-toolbox">
      <h3>Tools</h3>
      <Accordion className="tool-group tool-list">
        <AccordionSummary
          className="tool-category"
          expandIcon={<ExpandMoreIcon className="tool-group-icon" />}
        >
          Gems
        </AccordionSummary>
        <AccordionDetails className="tool-row">
          {Object.keys(unlockedGems).map((category, i) => (
            <Accordion key={i} className="gem-group">
              <AccordionSummary
                className="gem-category"
                expandIcon={<ExpandMoreIcon className="tool-group-icon" />}
              >
                {category}
              </AccordionSummary>
              <AccordionDetails className="gem-row">
                {unlockedGems[category].map((gem, j) => (
                  <Gem key={j} gem={gem} category={category} isTemplate />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion className="tool-group tool-list">
        <AccordionSummary
          className="tool-category"
          expandIcon={<ExpandMoreIcon className="tool-group-icon" />}
        >
          Values
        </AccordionSummary>
        <AccordionDetails className="tool-row">
          <div>
            {Object.keys(values).map((category, i) => (
              <Accordion key={i} className="value-group">
                <AccordionSummary
                  className="value-category"
                  expandIcon={<ExpandMoreIcon className="tool-group-icon" />}
                >
                  {category}
                </AccordionSummary>
                <AccordionDetails className="value-row">
                  {values[category].map(({ value, label }, j) => (
                    <Value key={j} value={value} label={label} isTemplate />
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="tool-group tool-list">
        <AccordionSummary
          className="tool-category"
          expandIcon={<ExpandMoreIcon className="tool-group-icon" />}
        >
          Variables
        </AccordionSummary>
        <AccordionDetails className="tool-row">
          {variables.map(({ name }, i) => (
            <Variable key={i} name={name} isTemplate />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EditorToolbox;

