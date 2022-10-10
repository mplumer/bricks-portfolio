import { types } from 'react-bricks/frontend';
import website from 'react-bricks-ui/website';
import project from 'react-bricks-ui/blog';
import HeroUnit from './MyHeroUnit';

const bricks: types.Brick<any>[] = [
  ...website, // React Bricks UI
  ...project,
  HeroUnit, // Example custom brick
];

export default bricks;
