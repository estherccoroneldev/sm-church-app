import { render } from '@testing-library/react-native';

// TO DO: Configure TamaguiProvider for testing
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import TabOneScreen from '../screens/one';

const Provider = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

describe('TabOne Screen', () => {
  it('renders correctly', () => {
    const component = render(
      <Provider>
        <TabOneScreen />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
