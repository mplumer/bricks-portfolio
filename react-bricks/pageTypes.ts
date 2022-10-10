import { types } from 'react-bricks/frontend';

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    excludedBlockTypes: [
      'title',
      'paragraph',
      'quote',
      'video',
      'code-block',
      'tweet',
      'tweet-light',
      'image',
    ],
  },
  {
    name: 'project',
    pluralName: 'Projects',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'description',
      'quote',
      'video',
      'code-block',
      'tweet',
      'tweet-light',
      'image',
    ],
  },
];

export default pageTypes;
