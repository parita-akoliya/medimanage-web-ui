import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

interface SelectButtonGroupProps {
  day: string;
  value: boolean[];
  onChange: (day: string, newValue: boolean[]) => void;
  disabled?: boolean;
}

const SelectButtonGroup: React.FC<SelectButtonGroupProps> = ({ day, value, onChange, disabled = false }) => {
    console.log(value);
    
  const handleToggle = (index: number) => {
    const newValue = value.map((v, i) => (i === index ? !v : v));
    onChange(day, newValue); // Call onChange to update parent state
  };
  console.log(value);
  
  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={() => {}}>
      <ToggleButton id={`${day}-btn-1`} checked={value[0]} value={0} onChange={() => handleToggle(0)} disabled={disabled}>
        Morning 7-11
      </ToggleButton>
      <ToggleButton id={`${day}-btn-2`} checked={value[1]} value={1} onChange={() => handleToggle(1)} disabled={disabled}>
        Afternoon 11-3
      </ToggleButton>
      <ToggleButton id={`${day}-btn-3`} checked={value[2]} value={2} onChange={() => handleToggle(2)} disabled={disabled}>
        Evening 3-7
      </ToggleButton>
      <ToggleButton id={`${day}-btn-4`} checked={value[3]} value={3} onChange={() => handleToggle(3)} disabled={disabled}>
        Night 7-11
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SelectButtonGroup;
