import React from "react";

interface Props {
  component?: React.ElementType<any>;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

const Box = ({ component = "div", sx, className, children }: Props) => {
  const Component = component;
  return (
    <Component style={sx} className={className || ""}>
      {children}
    </Component>
  );
};

export default Box;
