import { SlotPreview } from '@bitdev/harmony.preview.slot-preview';
import { MockProvider } from '@pied/pied-piper.testing.mock-provider';
import { Dashboard } from './dashboard.js';

const WelcomePanel = {
  component: () => {
    return <SlotPreview name='Panel A' minWidth={240} minHeight={120} />;
  }
}

const PeoplePanel = {
  component: () => {
    return <SlotPreview name='Panel B' minWidth={240} minHeight={120} />;
  },
  category: 'People'
}

export const BasicDashboard = () => {
  return (
    <MockProvider>
      <Dashboard panels={[WelcomePanel, PeoplePanel]} />
    </MockProvider>
  );
}

export const DashboardWithCategories = () => {
  return (
    <MockProvider>
      <Dashboard panels={[WelcomePanel, PeoplePanel]} />    
    </MockProvider>
  );
};
