import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Thread } from 'openai/resources/beta';
import { TextContentBlock } from 'openai/resources/beta/threads';
import { ExerciseAssistantType } from '../exercise.type';

@Injectable()
export class ExerciseTranslateAssistantService {
  readonly openai: OpenAI;
  readonly assistantId = 'asst_DLYdSU45yZoHbBTVfXw2Es8R';
  thread: Thread;

  constructor() {
    this.openai = new OpenAI();
  }

  async createThread() {
    this.thread = await this.openai.beta.threads.create();
  }

  async createMessage(content: string) {
    await this.openai.beta.threads.messages.create(this.thread.id, {
      role: 'user',
      content,
    });
  }

  run(instructions?: string) {
    return this.openai.beta.threads.runs.stream(this.thread.id, {
      assistant_id: this.assistantId,
      instructions,
      response_format: {
        type: 'json_object',
      },
    });
  }

  async generate(prompt: string): Promise<ExerciseAssistantType> {
    await this.createThread();
    await this.createMessage(prompt);
    return new Promise((resolve, reject) => {
      this.run()
        .on('messageDone', (message) => {
          const { text } = message.content[0] as TextContentBlock;
          resolve(JSON.parse(text.value));
        })
        .on('error', reject);
    });
  }
}
