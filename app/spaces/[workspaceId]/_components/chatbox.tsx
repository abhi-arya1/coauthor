"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpSquare } from 'lucide-react';

interface InputWithButtonProps {
  onInputSubmit: (value: string) => void;
  placeholder: string; 
}

export function InputWithButton({ onInputSubmit, placeholder }: InputWithButtonProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [pholder, setPlaceholder] = useState(placeholder);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (onInputSubmit && inputValue !== '') {
        onInputSubmit(inputValue);
        setInputValue('');
    } else if (inputValue === '') {
      setPlaceholder('Please Input At Least One Value!')
    }
  };


  return (
    <div className="flex flex-grow self-center items-center justify-self-end space-x-2 pt-2">
      <Input
        type="text"
        placeholder={pholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button type="submit" className="border-2" onClick={handleSubmit}><ArrowUpSquare /></Button>
    </div>
  );
}