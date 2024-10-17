import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { SystemPromptComponent } from '../system-prompt/system-prompt.component'; // Import
import { SystemPromptService } from '../system-prompt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css',
})
export class AnswerQuestionComponent {
  question = signal('');
  answer = signal('');
  conversationHistory = signal<{ sender: string; message: string }[]>([]);
  maxTurns = 20;
  currentTurn = 0;
  conversationEnded = signal(false);
  private readonly openAiService = inject(OpenAIService);
  private readonly systemPromptService = inject(SystemPromptService);
  private router = inject(Router);

  async answerQuestion() {
    if (this.currentTurn <= this.maxTurns) {
      const conversationHistoryStrings = this.conversationHistory().map(
        (entry) => entry.message
      );

      const systemPrompt = this.systemPromptService.getPrompt();

      const response = await this.openAiService.answerQuestion(
        conversationHistoryStrings,
        this.question(),
        systemPrompt
      );

      this.answer.set(response.choices[0].message.content);
      this.conversationHistory.update((history) => [
        ...history,
        { sender: 'User', message: this.question() },
        { sender: 'Bot', message: this.answer() },
      ]);
    }
    this.currentTurn++;
  }

  startOver() {
    this.question.set('');
    this.answer.set('');
    this.conversationHistory.set([]);
    this.currentTurn = 0;
    this.conversationEnded.set(false);
  }

  nagivateToSystemprompt() {
    this.router.navigate(['/systemPrompt']);
  }
}
