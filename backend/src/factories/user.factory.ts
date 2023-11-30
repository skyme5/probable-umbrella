import { faker } from '@faker-js/faker';
import { User } from 'src/resources/users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.password = faker.internet.password();
  user.email = faker.internet.email({});
  user.mobile = faker.helpers.fromRegExp('[6789][0-9]{9}');
  return user;
});
