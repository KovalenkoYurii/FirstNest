import { HttpService } from '@nestjs/common';
export declare class ScheduleService {
    private http;
    private readonly lessonUrl;
    private readonly groupRegex;
    constructor(http: HttpService);
    private getGroupUrl;
    getNextLessonForGroup(groupName: string): Promise<string>;
}
