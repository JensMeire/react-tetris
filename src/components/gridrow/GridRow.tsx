import React from "react";
import styles from "./GridRow.module.scss";

interface IProps {
  children?: React.ReactNode | React.ReactNode[]
}

const GridRow = (props: IProps): React.ReactElement => {
  return <div className={styles.row}>{props.children}</div>
}

export default GridRow;