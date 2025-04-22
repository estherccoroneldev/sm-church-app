import { render } from '@testing-library/react-native';

// TO DO: Configure TamaguiProvider for testing
import { TamaguiProvider } from 'tamagui';
import TabOneScreen from '../screens/one';
import config from '../tamagui.config';

const Provider = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

describe('TabOne Screen', () => {
  it('renders correctly', () => {
    const view = render(
      <Provider>
        <TabOneScreen />
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
