// context/ProviderComposer.tsx
import React from "react";

type ProviderComposerProps = {
  contexts: React.JSX.Element[];
  children: React.ReactElement;
};

export const ProviderComposer: React.FC<ProviderComposerProps> = ({
  contexts,
  children,
}) => {
  return contexts.reduceRight(
    (kids, parent) => React.cloneElement(parent, { children: kids }),
    children,
  );
};
