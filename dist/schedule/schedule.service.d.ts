import { HttpService } from '@nestjs/common';
export declare class ScheduleService {
    private http;
    private readonly lessonUrl;
    constructor(http: HttpService);
    private getGroupUrl;
    getNextLessonForGroup(groupName: string): Promise<string>;
}
