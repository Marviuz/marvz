import $figlet from 'figlet';

export const figlet = (msg: string, opts: $figlet.Options) =>
  new Promise<string>((resolve, reject) => {
    $figlet(msg, opts, (err, data) => {
      if (err) reject(err);
      if (!data) throw new Error('No message passed');
      resolve(data);
    });
  });
