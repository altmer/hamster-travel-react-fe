import draft from './images/statuses/draft.svg';
import planned from './images/statuses/planned.svg';
import finished from './images/statuses/finished.svg';

export const STATUSES = [
  {
    key: '0_draft',
    icon: draft,
    name: 'draft',
    description: 'draft description',
  },
  {
    key: '1_planned', icon: planned, name: 'planned', description: 'planned description',
  },
  {
    key: '2_finished', icon: finished, name: 'finished', description: 'finished description',
  },
];

export default STATUSES;
