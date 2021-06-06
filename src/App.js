import React, { useEffect, useRef, useContext, createContext } from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence, useMotionValue } from "framer-motion";
import { css, cx } from "@emotion/css";

const ContextDepth = createContext(0);

const CSS =
{
  Container:css`
    position:relative;
    background-color: rgba(214, 214, 214, 0.8);
    padding:5px;
    border-radius:10px;
    list-style-type:none;
  `,
  Button:css`
    display:inline-block;
    padding:5px 10px 5px 10px;
    border-radius:10px;
    background:black;
    cursor:pointer;
    color:yellow;
  `,
  Children:css`
    padding:0;
    margin:0;
  `,
  Leaf:css`
    padding:5px 10px 5px 10px;
    list-style-type:none;
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
  let menu = css`
    display:block;
    & > li
    {
      display:inline-block;
      vertical-align: top;
    }
  `;
  return (
  <AnimateSharedLayout>
    <ul className={menu}>
    <Branch useAway={true} title={"Programs"}>
      <Leaf>Outer A</Leaf>
      <Leaf>Outer B</Leaf>
      <Branch title="dropdown1">
        <Leaf>deep! Deep! deeeeep!</Leaf>
      </Branch>
      <Branch title="dropdown2">
        <Leaf>deep!</Leaf>
      </Branch>
    </Branch>
    <Branch useAway={true} title={"hey"}>
      <Leaf>Outer A</Leaf>
      <Leaf>Outer B</Leaf>
      <Branch title="dropdown1">
        <Leaf>deep!</Leaf>
      </Branch>
      <Branch title="dropdown2">
        <Leaf>deep!</Leaf>
      </Branch>
    </Branch>
    </ul>
  </AnimateSharedLayout>
  );
}

const Leaf = props =>
{
  return (
  <motion.li className={CSS.Leaf} layout="position">{props.children}</motion.li>
  );
};

const Branch = props =>
{
  const [openGet, openSet] = useState(false);
  const root = useAway( props.useAway ? ()=>openSet(false) : null);
  const currentDepth = useContext(ContextDepth);

  const [animGet, animSet] = useState({opacity:0, height:0});
  useEffect(() => {
    const stateClosed = {opacity:0, height:0, overflow:"hidden"};
    const stateOpen = {opacity:1, height:"auto", transitionEnd:{height:"auto", overflow:"visible"}};
    animSet(openGet?stateOpen:stateClosed);
  }, [openGet]);

  return (
  <motion.li id={props.id} className={CSS.Container} layout ref={root}>
    <motion.span className={CSS.Button} layout onClick={e=>openSet(!openGet)}>{props.title} | {currentDepth}</motion.span>
    <motion.ul
      className={CSS.Children}
      data-depth={currentDepth}
      initial={{ opacity: 0, height:0 }}
      animate={animGet}
      transition={{ease:"easeOut", duration:0.4, onEnd:()=>console.log("D O N E")}} >
      <ContextDepth.Provider value={currentDepth+1}>{props.children}</ContextDepth.Provider>
    </motion.ul>
  </motion.li>
  );
};
