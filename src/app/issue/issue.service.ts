import { Injectable } from '@angular/core';
import { JiraIssueService } from './jira/jira-issue/jira-issue.service';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { IssueEntityMap } from './issue';
import { IssueProviderKey } from './issue';
import { JiraIssueContentComponent } from './jira/jira-issue/jira-issue-content/jira-issue-content.component';
import { JiraIssueHeaderComponent } from './jira/jira-issue/jira-issue-header/jira-issue-header.component';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  public issueEntityMap$: Observable<IssueEntityMap> = combineLatest(
    this._jiraIssueService.jiraIssuesEntities$
  ).map(([jiraEntities]) => {
    return {
      JIRA: jiraEntities
    };
  });

  constructor(private _jiraIssueService: JiraIssueService) {
    this.issueEntityMap$.subscribe((v) => console.log(v));
  }

  public getTabHeader(issueType: IssueProviderKey) {
    switch (issueType) {
      case 'JIRA': {
        return JiraIssueHeaderComponent;
      }
    }
  }


  public getTabContent(issueType: IssueProviderKey) {
    switch (issueType) {
      case 'JIRA': {
        return JiraIssueContentComponent;
      }
    }
  }
}
