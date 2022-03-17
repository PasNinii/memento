export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<any> = jest.fn(() => ({
  find: jest.fn((entity) => entity),
  findOne: jest.fn((entity) => entity),
  save: jest.fn((entity) => {
    if (entity.id) return entity;
    return { ...entity, id: 0 };
  }),
  create: jest.fn((entity) => ({ id: 0, ...entity })),
  delete: jest.fn((id) => ({ raw: id, affected: 1 })),
}));
