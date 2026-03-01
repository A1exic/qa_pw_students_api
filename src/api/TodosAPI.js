import { BaseAPI } from './BaseAPI';
import { expect } from '../../_fixtures/fixtures';

export class TodosAPI extends BaseAPI {
  async getAllTodos() {
    return await this.step(`GET all todos`, async () => {
      return await this.request.get('/todos', {});
    });
  }

  async getTodosForUserByCompleted(userId, completed) {
    return await this.step(
      `GET todos for userId=${userId} completed=${completed}`,
      async () => {
        return await this.request.get('/todos', {
          params: { userId, completed },
        });
      },
    );
  }

  async assertUserIdIsCorrect(response, userId) {
    await this.step(`Assert the todo's userId is correct`, async () => {
      const body = await this.parseBody(response);

      expect(body[0].userId).toEqual(userId);
    });
  }

  async assertCompletedIsCorrect(response, completed) {
    await this.step(
      `Assert the todo's completed field is correct`,
      async () => {
        const body = await this.parseBody(response);

        expect(body[0].completed).toEqual(completed);
      },
    );
  }
}
