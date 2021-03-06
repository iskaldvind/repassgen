import commandLineArgs from 'command-line-args';
import getUsage from 'command-line-usage';
import generate from './generator';
import complexify from './complicator';

const jsonData = require('./base.json');

const data = jsonData;

const optionsDescription =
  `Options [underline]{code} (-o key could be omitted) in pattern of (1*)(2*)(3*), i.e. '10a6', where:
    1* - integer amount of passwords to generate (min 1);
    2* - string complexity code as follows:
         a - 'abcd', A - 'aBcD', n - 'a2c4', N - 'a2C4', s - 'a@c$', S - 'a@C$', f - 'a2c$', F - 'a2C$';
    3* - integer length of passwords to generate (min 6).`;
const optionDefenitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'options', alias: 'o', type: String, defaultOption: true },
];

const description = [
  {
    header: 'REadabe PASSwords GENerator',
    content: 'Generate passwords which are easy readable and feel like english words.',
  },
  {
    header: 'Synopsis',
    content: [
      '$ repassgen [[bold]{--options} | [bold]{-o}] [underline]{code}',
      '$ repassgen [[bold]{--help} | [bold]{-h}]',
    ],
  },
  {
    header: 'Options',
    content: [
      {
        option: '[bold]{--help}, [bold]{-h}',
        description: 'Display this usage guide.',
      },
      {
        option: '[bold]{--options}, [bold]{-o} [underline]{code}',
        description: `${optionsDescription}`,
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. Generate 1 password with only lowercase letters and length of 6:',
        example: '$ repassgen -o 1a6',
      },
      {
        desc: '2. Generate 10 passwords with lowercase and uppercase letters and numbers and length of 8:',
        example: '$ repassgen 10N8',
      },
      {
        desc: '3. Display usage guide:',
        example: '$ repassgen -h',
      },
      {
        desc: '4. Also will display usage guide:',
        example: '$ repassgen',
      },
    ],
  },
  {
    content: 'Project page: [underline]{https://github.com/iskaldvind/repassgen}',
  },
];

const usage = getUsage(description);
const args = commandLineArgs(optionDefenitions);
const validOptionsRegEx = /\b([1-9]+[0-9]*)([aAnNsSfF])([1-9]+[0-9]*)\b/;

const parseGenOptions = () => {
  const optionsCode = args.options;
  const parsedOptions = validOptionsRegEx.exec(optionsCode);
  if (!parsedOptions || parsedOptions[3] < 6) {
    throw new Error('Parser Error: Invalid options. Please run "repassgen -h" to see usage guide.');
  }
  return {
    passAmount: parsedOptions[1],
    passComplexity: parsedOptions[2],
    passLength: parsedOptions[3],
  };
};

const displayUsage = () => console.log(usage);

const displayError = error => console.log(`${error.message}`);

const repassgen = () => {
  if (args.help || Object.keys(args).length === 0) {
    return displayUsage();
  }
  try {
    parseGenOptions();
  } catch (err) {
    return displayError(err);
  }
  const options = parseGenOptions();
  const threads = new Array(Number(options.passAmount) + 1).join('x').split('');
  const generatePasswordPromise = () => new Promise((resolve, reject) => {
    try {
      const password =
        complexify(options.passComplexity, generate(data, Number(options.passLength)));
      resolve(password);
    } catch (err) {
      reject(err);
    }
  });
  return Promise.all(threads.map(() => generatePasswordPromise()))
    .then(passwords => console.log(passwords.join('\n')), error => displayError(error));
};

export default repassgen;
