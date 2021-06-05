import React, { useEffect, useRef, useContext } from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { css, cx } from "@emotion/css";


const CSS =
{
  Container:css`
    background-color: rgba(214, 214, 214, 0.8);
    border-radius:10px;
  `,
  Button:css`
    display:inline-block;
    padding:5px 10px 5px 10px;
    border-radius:10px;
    background:black;
    cursor:pointer;
    color:white;
  `,
  Children:css`
    padding:10px;
  `
};

const useAway = (inOut) =>
{
  var handleEffect;
  if(inOut)
  {
    handleEffect = () =>
    {
      const handler = inEvent => refRoot.current.contains(inEvent.target) ? null : inOut(inEvent);
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    };
  }
  else
  {
    handleEffect = () => {};
  }
  useEffect(handleEffect);
  const refRoot = useRef(null);
  return refRoot;
}

export default function App()
{
  return (
  <AnimateSharedLayout>
    <Menu useAway={true} title={"hey"}>
      <Item>Outer A</Item>
      <Item>Outer B</Item>
      <Menu title="dropdown1">
        <p>deep!</p>
      </Menu>
      <Menu title="dropdown2">
        <p>deep!</p>
      </Menu>
    </Menu>
  </AnimateSharedLayout>
  );
}

const Item = props =>
{
  return (
    <motion.li layout>{props.children}</motion.li>
  );
};

const Menu = props =>
{
  const [openGet, openSet] = useState(false);
  const root = useAway( props.useAway ? ()=>openSet(false) : null);

  return (
    <motion.li id={props.id} className={CSS.Container} layout ref={root}>
      <motion.span className={CSS.Button} layout onClick={e=>openSet(!openGet)}>{props.title}</motion.span>
      <AnimatePresence>
      {
        openGet &&
        <motion.ul className={CSS.Children} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {props.children}
        </motion.ul>
      }
      </AnimatePresence>
    </motion.li>
  );
};
