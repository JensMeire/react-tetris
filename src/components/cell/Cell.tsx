import React from "react";
import styles from "./Cell.module.scss"

interface IProps {
  color?: string;
}

const Cell = (props: IProps): React.ReactElement => {
  return <div className={styles.cell} style={{backgroundColor: props.color ?? "white"}}></div>
}

export default Cell;