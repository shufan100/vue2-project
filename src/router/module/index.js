import demoModule from './demo';
import fromRouter from './from1';
import dragAndDropRouter from './dragAndDrop';
import userInfoRouter from './userInfo';
import msgRouter from './msg';

export default [
  ...demoModule,
  ...fromRouter,
  ...dragAndDropRouter,
  ...userInfoRouter,
  ...msgRouter,
];
