import React from "react";
import { Navbar,Text,useTheme, } from "@nextui-org/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

export default function Nav() {
  const [variant, setVariant] = React.useState("default");
  const [activeColor, setActiveColor] = React.useState("primary");

  const {isDark} = useTheme();

  const variants = [
    "default",
    "highlight",
    "highlight-solid",
    "underline",
    "highlight-rounded",
    "highlight-solid-rounded",
    "underline-rounded",
  ];

  const colors = ["primary", "secondary", "success", "warning", "error"];
  
  return (
 
      <Navbar isBordered={isDark} variant="sticky">
        <Navbar.Brand>
          
          <Text b color="inherit" hideIn="xs">
            P2P Exchange
          </Text>
          
        </Navbar.Brand>
        <Navbar.Content activeColor={activeColor} hideIn="xs" variant={variant}>
          
        </Navbar.Content>
        <Navbar.Content>
         
          <Navbar.Item>
            <ConnectButton />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>      
    
  )
}
