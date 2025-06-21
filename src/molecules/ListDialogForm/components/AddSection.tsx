import {memo, useState} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import {ListDialogProps} from '../../ListDialog'

import SectionManagement from './SectionManagement'

export type AddSectionProps = Pick<ListDialogProps, 'type'> & {
  handleAddSection: (sectionName: string | null) => void
}

const AddSection = ({handleAddSection, type}: AddSectionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const onChange = (__: React.SyntheticEvent, isExpandedNew: boolean) => {
    setIsExpanded(isExpandedNew)
  }

  const handleAdd = (sectionName: string | null) => {
    handleAddSection(sectionName)
    setIsExpanded(false)
  }

  return (
    <div>
      <Accordion elevation={3} expanded={isExpanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Abschnitt hinzufügen</Typography>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-2">
          <SectionManagement handleAdd={handleAdd} type={type} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default memo(AddSection)
