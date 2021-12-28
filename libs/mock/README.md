# @scandinavia/mock

A simple package to mock data where is your backend is busy.

## Usage

```ts
import * as mock from '@scandinavia/mock';

// first name.
const randomMaleFirstName = mock.firstname('male');
const randomFemaleFirstName = mock.firstname('female');
const randomFirstName = mock.firstname();

// last name.
const randomLastName = mock.lastname();

// full name
const randomMaleFullName = mock.fullname('male');
const randomFullName = mock.fullname();

// username
const randomUsername = mock.username();

// word
const randomWord = mock.word();

// lorem/text
const randomTextWith100Words = mock.lorem(100);

// phone
const randomPhone = mock.phone();
const random12CharPhone = mock.phone(12);

// date
const rancomDateInTheFuture = mock.date(new Date(), new Date('2200'));
const rancomDateInThePast = mock.date();

// image
const randomSquareImageUrl = mock.image(200, 200);
const randomImageUrl = mock.date();

// avatar
const randomSmallAvatarUrl = mock.avatar(50);
const randomAvatarUrl = mock.date();

// number
const randomNumber = mock.number();
const randomFloatNumber = mock.number(true);
const randomNumberFrom10To100 = mock.number(10, 100);

// unique
const randomID = mock.unique();
const random4CharID = mock.unique(4);

// pick
const randomItem = mock.pick('item 1', 'item 2', 'item 3');
const randomValue = mock.pick(1, 2, 3);

// array
const randomArrayOfFullNamesLength20 = mock.array(() => mock.fullname(), 20);
```

this is the basic usage, let's see the real life application.

```ts
// in your model definition.
export type Product = {
  id: string;
  title: string;
  description: string;
  distributer: string;
  images: string[];
  price: number;
  category: 'tablet' | 'laptop' | 'mobile';
  discount: number;
  createdAt: Date;
};

export const mockProduct = (): Product => ({
  id: mock.unique(),
  title: mock.lorem(3),
  description: mock.lorem(20),
  distributer: mock.fullname(),
  images: mock.array(() => mock.image(200, 300), mock.number(1, 3)),
  price: mock.number(500, 4000),
  category: mock.pick('tablet', 'laptop', 'mobile'),
  discount: mock.number(0, 10),
  createdAt: mock.date(),
});

// in your products page.
const products = mock.array(mockProduct, mock.number(10, 30));

// in single product page.
const product = mockProduct();
```
