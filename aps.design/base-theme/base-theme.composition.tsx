import { TokenViewer } from '@bitdesign/sparks.sparks-theme';
import { useTheme } from './base-theme-provider.js';
import { BaseTheme } from './base-theme.js';

const ShowTokens = () => {
  const theme = useTheme();
  return <TokenViewer theme={theme} />;
};

export const BasicBaseTheme = () => {
  return (
    <BaseTheme>
      <ShowTokens />
    </BaseTheme>
  );
};
