import { figlet } from './wrappers/figlet';

export function greet(msg: string) {
  return figlet(msg, { font: 'Big' });
}
