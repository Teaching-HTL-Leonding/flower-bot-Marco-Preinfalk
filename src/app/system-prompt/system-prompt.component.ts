import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemPromptService } from '../system-prompt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './system-prompt.component.html',
  styleUrl: './system-prompt.component.css'
})
export class SystemPromptComponent {
  private systemPromptService = inject(SystemPromptService);
  private router = inject(Router);

  selectedPrompt = 'default';
  systemPrompt = this.systemPromptService.systemPrompt();
  isDefaultPrompt = true;

  updatePrompt(newPromptType: string) {
    if (!newPromptType) {
      this.isDefaultPrompt = true;
      this.systemPrompt = this.systemPromptService.defaultPrompt;
      this.selectedPrompt = 'default';
    } else if (newPromptType === 'default') {
      this.isDefaultPrompt = true;
      this.systemPrompt = this.systemPromptService.defaultPrompt;
    } else {
      this.isDefaultPrompt = false;
      this.systemPrompt = newPromptType;
    }
  }

  updateCustomPrompt() {
    if (!this.isDefaultPrompt) {
      this.systemPromptService.updatePrompt(this.systemPrompt);
    }
  }

  navigateToAnswerQuestion() {
    this.updateCustomPrompt();
    this.router.navigate(['/answerQuestion']);
  }
}
