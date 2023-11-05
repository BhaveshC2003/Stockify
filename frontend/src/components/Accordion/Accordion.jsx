import React from 'react'
import "./accordion.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomAccordion = ({expanded=false,label,data}) => {
  return (
      <div className="stockify__accordion">
          <Accordion defaultExpanded={expanded}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
              >
                <Typography fontWeight={500}>{label.toUpperCase()}</Typography>
              </AccordionSummary>
              <AccordionDetails>
					{
						Object.keys(data).map(key=>{
							return(
								<>
									<Typography fontWeight={500} margin={"3px 0"} fontSize={"1.1vmax"}>
										{key.toUpperCase()}
									</Typography>
									<Typography  fontSize={"1.1vmax"}>{data[key]}</Typography>
								</>
							)
						})
					}
              </AccordionDetails>
          </Accordion>
      </div>
  );
}

export default CustomAccordion