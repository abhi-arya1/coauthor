"use client";
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@/components/ui/button';
import { FunctionSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-inherit pb-9 pointer-events-none">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Coauthor</p>
        <div className="flex space-x-3 items-center justify-center z-[999999] pointer-events-none">

            <Button variant="outline" onClick={() => {window.open("https://google.com", "_blank")}}>
                <span className="pr-2">DevPost</span><FunctionSquare className="h-4 w-4"/> 
            </Button>
            <Button variant="outline" onClick={() => {window.open("https://github.com/abhi-arya1/coauthor", "_blank")}}>
                <span className="pr-2">GitHub</span><GitHubIcon className="h-4 w-4"/> 
            </Button >
        </div>
      </div>
    </footer>
  );
};

export default Footer;
