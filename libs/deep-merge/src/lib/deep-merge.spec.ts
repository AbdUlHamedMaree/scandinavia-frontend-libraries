import { deepMerge } from './deep-merge';
type Student = Partial<{
  name: string;
  images: string[];
  isDead: boolean;
  certs: {
    name: string;
    year: Date;
  }[];
  profile: {
    BirthDate: Date;
    married: boolean;
  };
  a: string;
  b: string;
}>;

it('deep-merge test, expect merge two student successfully', () => {
  const aDate = new Date('1995-12-17T03:24:00');
  const bDate = new Date('1990-12-17T03:24:00');
  const a: Student = {
    name: 'John',
    images: ['1'],
    isDead: true,
    profile: {
      BirthDate: aDate,
      married: false,
    },
    certs: [{ name: '1', year: aDate }],
    a: 'a',
  };
  const b: Student = {
    name: 'Doe',
    images: ['2'],
    isDead: false,
    profile: {
      BirthDate: bDate,
      married: true,
    },
    certs: [{ name: '2', year: bDate }],
    b: 'b',
  };

  const toGet: Student = {
    name: 'Doe',
    images: ['1', '2'],
    isDead: false,
    profile: {
      BirthDate: bDate,
      married: true,
    },
    certs: [
      { name: '1', year: aDate },
      { name: '2', year: bDate },
    ],
    a: 'a',
    b: 'b',
  };
  expect(deepMerge(a, b)).toEqual(toGet);
});

it('deep-merge test, expect merge object with undefined to be defined', () => {
  const aDate = new Date('1995-12-17T03:24:00');
  const a: Student = {
    name: 'John',
    images: ['1'],
    isDead: true,
    profile: {
      BirthDate: aDate,
      married: false,
    },
    certs: [{ name: '1', year: aDate }],
    a: 'a',
  };
  const b = undefined;

  const toGet: Student = a;
  expect(deepMerge(a, b)).toEqual(toGet);
});
