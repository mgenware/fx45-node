import objectFromDirectory from '../lib/main';

const DATA_DIR = './tests/data';

test('All files', () => {
  expect(objectFromDirectory(DATA_DIR)).toEqual({
    'a.txt': 'contents of a',
    'b.txt': '',
    'root': {
      child: {
        'b.txt': '# title of b\ncontents of b',
      },
    },
  });
});

test('Ignore files', () => {
  expect(objectFromDirectory(DATA_DIR, ['b.txt'])).toEqual({
    'a.txt': 'contents of a',
  });
});
