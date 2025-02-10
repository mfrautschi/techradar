import {Category} from './category';
import {Ring} from './ring';
import {Status} from './status';

export interface Technology{
  id: number,
  name: string,
  category: Category,
  ring: Ring,
  techDescription: string,
  whyDescription: string,
  creationDate: Date,
  status: Status,
  publicationDate: Date
}
