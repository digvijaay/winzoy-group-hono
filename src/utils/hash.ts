import bcrypt from 'bcryptjs';

const saltRounds = 10;

// Make sure 'export' is here
export const hashPassword = async (password: string): Promise<string> => {
  // return await Bun.password.hash(password, {
  //   algorithm: 'bcrypt',
  //   cost: saltRounds,
  // });
  return await bcrypt.hash(password, saltRounds);
};

// And also here
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  // return await Bun.password.verify(password, hash);

  return await bcrypt.compare(password, hash);
};
