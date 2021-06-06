import React, { useEffect, useRef, useContext, createContext } from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { css, cx } from "@emotion/css";

export default function Collapse(props)
{
  const outer = useRef();
  const inner = useRef();
  const [openGet, openSet] = useState(false);

  useEffect(()=>
  {

  });

  const outerCSS = css`
    position:relatve;
    overflow:hidden;
    transition:height 0.4s;
  `;
  const innerCSS = css`
    position:absolute;
    top:0;
    left:0;
    width:100%;
  `;

  return (<div ref={outer} className={outerCSS}>
    <div ref={inner}>
      {props.children}
    </div>
  </div>);
}