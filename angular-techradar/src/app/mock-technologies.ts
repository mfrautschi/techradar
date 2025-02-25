import {Technology} from './Technology';
import {Ring} from './ring';
import {Category} from './category';
import {Status} from './status';

export const TECHNOLOGIES: Technology[] = [
  {
    id: 1,
    name: 'Angular',
    category: Category.LanguagesAndFrameworks,
    ring: Ring.Adopt,
    techDescription: 'A platform and framework for building single-page client applications using HTML and TypeScript.',
    classDescription: '',
    creationDate: new Date(),
    status: Status.Captured,
    publicationDate: new Date(new Date().setFullYear(1900, 1, 1))
  },
  {
    id: 2,
    name: 'React',
    category: Category.LanguagesAndFrameworks,
    ring: Ring.Trial,
    techDescription: 'A JavaScript library for building user interfaces.',
    classDescription: '',
    creationDate: new Date(),
    status: Status.Published,
    publicationDate: new Date()
  },
  {
    id: 3,
    name: 'Vue.js',
    category: Category.LanguagesAndFrameworks,
    ring: Ring.Assess,
    techDescription: 'A progressive framework for building user interfaces.',
    classDescription: '',
    creationDate: new Date(),
    status: Status.Captured,
    publicationDate: new Date(new Date().setFullYear(1900, 1, 1))
  },
  {
    id: 4,
    name: 'Docker',
    category: Category.Platforms,
    ring: Ring.Hold,
    techDescription: 'An open platform for developing, shipping, and running applications.',
    classDescription: '',
    creationDate: new Date(),
    status: Status.Published,
    publicationDate: new Date()
  }
];
