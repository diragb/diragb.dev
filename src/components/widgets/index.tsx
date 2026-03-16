// Components:
import CaffeineCutoffCalculator from './caffeine-cutoff-calculator'
import SleepDaysCalculator from './sleep-days-calculator'
import SleepTimeCalculator from './sleep-time-calculator'
import NewsletterCallout from '../secondary/NewsletterCallout'

// Constants:
const widgets = {
  'caffeine-cutoff-calculator': () => <CaffeineCutoffCalculator />,
  'sleep-days-calculator': () => <SleepDaysCalculator />,
  'sleep-time-calculator': () => <SleepTimeCalculator />,
  'newsletter-callout': () => <NewsletterCallout />,
}

// Exports:
export default widgets
