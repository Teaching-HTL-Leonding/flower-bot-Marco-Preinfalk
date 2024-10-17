import { Routes } from '@angular/router';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { SystemPromptComponent } from './system-prompt/system-prompt.component';

export const routes: Routes = [
  {path: 'answerQuestion', component: AnswerQuestionComponent},
  { path: 'systemPrompt', component: SystemPromptComponent },
  {path: '', redirectTo: '/answerQuestion', pathMatch: 'full'}
];
