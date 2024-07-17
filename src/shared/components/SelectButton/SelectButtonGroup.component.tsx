import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

interface SelectButtonGroupProps {
  day: string;
  value: boolean[];
  onChange: (day: string, newValue: boolean[]) => void;
  disabled?: boolean;
}

const SelectButtonGroup: React.FC<SelectButtonGroupProps> = ({ day, value, onChange, disabled = false }) => {
  const handleToggle = (index: number) => {
    const newValue = [...value];
    newValue[index] = !newValue[index];
    onChange(day, newValue);
  };
  console.log(day, value);
  
  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={() => {}}>
      <ToggleButton id={`${day}-btn-1`} checked={value[0]} value={0} onChange={() => handleToggle(0)} disabled={disabled} variant={value[0] ? 'primary' : 'secondary'}>
        Morning 7-11
      </ToggleButton> &nbsp;&nbsp;&nbsp;
      <ToggleButton id={`${day}-btn-2`} checked={value[1]} value={1} onChange={() => handleToggle(1)} disabled={disabled} variant={value[1] ? 'primary' : 'secondary'}>
        Afternoon 11-3
      </ToggleButton>&nbsp;&nbsp;&nbsp;
      <ToggleButton id={`${day}-btn-3`} checked={value[2]} value={2} onChange={() => handleToggle(2)} disabled={disabled} variant={value[2] ? 'primary' : 'secondary'}>
        Evening 3-7
      </ToggleButton>&nbsp;&nbsp;&nbsp;
      <ToggleButton id={`${day}-btn-4`} checked={value[3]} value={3} onChange={() => handleToggle(3)} disabled={disabled} variant={value[3] ? 'primary' : 'secondary'}>
        Night 7-11
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SelectButtonGroup;
