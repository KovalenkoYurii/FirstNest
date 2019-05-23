import { Injectable, HttpService } from '@nestjs/common';
import { JSDOM } from 'jsdom';

interface ScheduleResponse {
  data: { group_url: string };
}

@Injectable()
export class ScheduleService {
  private readonly lessonUrl = 'https://api.rozklad.org.ua/v2/groups';
  private readonly groupRegex: RegExp;
  constructor(private http: HttpService) {
    this.groupRegex = /[А-я|і]*-[\d]*/g;
  }

  private async getGroupUrl(groupName: string) {
    const encodedGroupName = encodeURIComponent(groupName);
    const response = await this.http
      .get<ScheduleResponse>(`${this.lessonUrl}/${encodedGroupName}`)
      .toPromise();
    return response.data.data.group_url;
  }

  public async getNextLessonForGroup(groupName: string) {
    const groupUrl = await this.getGroupUrl(groupName);
    const {
      window: { document },
    } = await JSDOM.fromURL(groupUrl, {
      resources: 'usable',
      runScripts: 'dangerously',
    });
    const nextLesson =
      document.querySelector('.closest_pair .plainLink') ||
      document.querySelector('.current_pair .plainLink');
    return nextLesson.textContent;
  }
}
